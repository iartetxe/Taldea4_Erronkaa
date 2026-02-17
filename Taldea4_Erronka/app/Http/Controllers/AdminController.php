<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Obra;
use App\Models\Kontaktua;
use App\Models\ForuProposamena;
use Illuminate\Support\Facades\Mail; 
use App\Mail\KontaktuaErantzuna;    

class AdminController extends Controller
{
    public function dashboard()
    {
        $stats = [
            'erabiltzaileak' => User::count(),
            'obrak_guztira' => Obra::count(),
            'enkantean' => Obra::whereNotNull('enkante_amaiera')->count(),
            'salmentak' => Obra::whereNotNull('eroslea_id')->count(),
        ];

        $obrak = Obra::latest()->get();
        $kontaktuak = Kontaktua::latest()->get();
        $erabiltzaileak = User::latest()->get();
        
        // <--- RETURN BAINO LEHENAGO SARTU DUGU HAU:
        $foruProposamenak = ForuProposamena::with('user')->latest()->get(); 

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'obrak' => $obrak,
            'kontaktuak' => $kontaktuak,
            'erabiltzaileak' => $erabiltzaileak,
            'foruProposamenak' => $foruProposamenak
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'izenburua' => 'required|string|max:255',
            'artista' => 'required|string|max:255',
            'data' => 'required|string',
            'mota' => 'required|string',
            'deskribapena' => 'required|string',
            'kokalekua' => 'required|string',
            'irudia' => 'required|image|max:5120',
            'prezioa' => 'nullable|numeric', 
            'hasierako_prezioa' => 'nullable|numeric',
            'enkante_amaiera' => 'nullable|date',
        ]);

        if ($request->hasFile('irudia')) {
            $path = $request->file('irudia')->store('obras', 'public');
            $validated['irudia'] = '/storage/' . $path;
        }

        Obra::create($validated);
        return back()->with('success', 'Obra ondo igo da!');
    }

    public function destroyObra($id)
    {
        Obra::findOrFail($id)->delete();
        return back()->with('success', 'Obra ondo ezabatu da!');
    }

    public function destroyKontaktua($id)
    {
        Kontaktua::findOrFail($id)->delete();
        return back()->with('success', 'Mezua ezabatu da!');
    }

    public function destroyUser($id)
    {
        $user = User::findOrFail($id);
        
        if ($user->id === auth()->id()) {
            return back()->withErrors(['error' => 'Ezin duzu zeure burua ezabatu!']);
        }
        
        $user->delete();
        return back()->with('success', 'Erabiltzailea ondo ezabatu da!');
    }

    public function erantzunMezua(Request $request, $id)
    {
        $request->validate(['erantzuna' => 'required|string']);
        
        $mezua = Kontaktua::findOrFail($id);

        Mail::to($mezua->email)->send(new KontaktuaErantzuna($mezua, $request->erantzuna));

        $mezua->delete();

        return back()->with('success', 'Erantzuna ondo bidali zaio erabiltzaileari eta mezua ezabatu da!');
    }

    public function destroyForuProposamena($id) {
        ForuProposamena::findOrFail($id)->delete();
        return back()->with('success', 'Proposamena ezabatu da.');
    }
}