<?php

namespace App\Http\Controllers;

use App\Models\Obra;
use App\Models\Bid;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use Illuminate\Support\Facades\Mail;
use App\Mail\EnkanteIrabazlea;

class EnkanteController extends Controller
{
    public function index()
    {
        // --- PARTE 1: CERRAR SUBASTAS Y AVISAR AL GANADOR ---
        
        // Buscamos obras cuya fecha ha pasado PERO aún no tienen ganador asignado
        $expiredAuctions = Obra::whereNotNull('enkante_amaiera')
            ->where('enkante_amaiera', '<', Carbon::now()) 
            ->whereNull('irabazlea_id') 
            ->get();

        foreach ($expiredAuctions as $obra) {
            // Buscamos la puja más alta
            $winningBid = $obra->bids()->orderBy('kopurua', 'desc')->first();

            if ($winningBid) {
                // 1. Guardar el ganador en la base de datos
                $obra->update(['irabazlea_id' => $winningBid->user_id]);

                // 2. Cargar datos del usuario para tener su email
                $obra->load('irabazlea'); 
                
                // 3. ENVIAR EMAIL DE CONFIRMACIÓN
                if ($obra->irabazlea && $obra->irabazlea->email) {
                    // Esto envía el correo usando la clase que creamos antes
                    Mail::to($obra->irabazlea->email)->send(new EnkanteIrabazlea($obra));
                }
            }
        }

        // --- PARTE 2: PREPARAR DATOS PARA LA WEB ---

        $enkanteak = Obra::whereNotNull('enkante_amaiera')
            ->with(['bids.user', 'irabazlea']) // Traemos pujas y ganador
            ->get()
            ->map(function ($obra) {
                // Calcular precio actual
                $maxBid = $obra->bids->max('kopurua');
                $currentPrice = $maxBid ? $maxBid : $obra->hasierako_prezioa;
                
                // Saber si ha terminado
                $isEnded = Carbon::now()->greaterThan($obra->enkante_amaiera);

                return [
                    'id' => $obra->id,
                    'izenburua' => $obra->izenburua,
                    'artista' => $obra->artista,
                    'irudia' => $obra->irudia,
                    'enkante_amaiera' => $obra->enkante_amaiera,
                    'prezioa' => $currentPrice,
                    'pujas_count' => $obra->bids->count(),
                    // Nombre del usuario que va ganando (o ganó)
                    'top_bidder' => $maxBid ? $obra->bids->sortByDesc('kopurua')->first()->user->izena : null,
                    'is_ended' => $isEnded,
                    // Nombre del ganador oficial (si ya se cerró)
                    'irabazlea' => $obra->irabazlea ? $obra->irabazlea->izena : null, 
                ];
            });

        return Inertia::render('Enkanteak', [
            'enkanteak' => $enkanteak
        ]);
    }

    public function pujar(Request $request, $id)
    {
        $user = Auth::user();
        $obra = Obra::findOrFail($id);
        
        // Validar que no haya terminado
        if (Carbon::now()->greaterThan($obra->enkante_amaiera)) {
            return back()->withErrors(['message' => 'Subasta itxita dago!']);
        }

        // Calcular puja mínima (debe superar la actual o el precio inicial)
        $maxBid = $obra->bids()->max('kopurua') ?? $obra->hasierako_prezioa;
        
        $request->validate([
            'kopurua' => 'required|numeric|gt:' . $maxBid
        ]);

        // Crear la puja
        Bid::create([
            'user_id' => $user->id,
            'obra_id' => $obra->id,
            'kopurua' => $request->kopurua
        ]);

        return back();
    }
}