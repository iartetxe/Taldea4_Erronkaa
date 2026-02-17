<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Obra;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class ProfilaController extends Controller
{
    // Profila erakutsi
    public function index()
    {
        $user = Auth::user();
        
        // Erabiltzaileak erosi dituen obrak bilatu
        $erosketak = Obra::where('eroslea_id', $user->id)
                        ->orWhere('irabazlea_id', $user->id) // Enkanteak irabazitakoak baditu
                        ->latest()
                        ->get();

        return Inertia::render('Profila', [
            'erabiltzailea' => $user,
            'erosketak' => $erosketak
        ]);
    }

    // Datu pertsonalak eguneratu
    public function update(Request $request)
    {
        $user = User::find(Auth::id());

        // HEMEN DITUZU DATU GUZTIAK BALIDATZEKO
        $validated = $request->validate([
            'izena' => 'required|string|max:255',
            'abizenak' => 'required|string|max:255',
            
            // FORMA CORRECTA Y MODERNA DE USAR RULE::UNIQUE
            'email' => [
                'required',
                'email',
                'max:255',
                Rule::unique('users')->ignore($user->id) 
            ],  
            
            'telefonoa' => 'nullable|string|max:20',
            'helbidea' => 'nullable|string|max:255',
            'password' => 'nullable|string|min:8|confirmed',
        ]);

        // DATUAK ERABILTZAILEARI EGOTZI
        $user->izena = $validated['izena'];
        $user->abizena = $validated['abizena'];
        $user->email = $validated['email'];
        
        // ZURE ERREGISTROKO BESTE EREMUAK:
        $user->telefonoa = $validated['telefonoa'] ?? $user->telefonoa;
        $user->helbidea = $validated['helbidea'] ?? $user->helbidea;

        // Pasahitza aldatu badu
        if (!empty($validated['password'])) {
            $user->password = Hash::make($validated['password']);
        }

        $user->save();

        return back()->with('success', 'Zure datuak ondo eguneratu dira!');
    }
}