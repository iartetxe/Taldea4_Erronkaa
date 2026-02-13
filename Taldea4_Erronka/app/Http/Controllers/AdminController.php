<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Obra;
use App\Models\Kontaktua;
use Illuminate\Support\Facades\Storage;

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

        // Obra GUZTIAK kudeatzeko
        $obrak = Obra::latest()->get();
        
        // Jendearen MEZUAK kudeatzeko
        $kontaktuak = Kontaktua::latest()->get();

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'obrak' => $obrak,
            'kontaktuak' => $kontaktuak
        ]);
    }

    // --- OBRA SORTU (Lehendik zeneukana) ---
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

    // --- OBRA EZABATU (Berria) ---
    public function destroyObra($id)
    {
        $obra = Obra::findOrFail($id);
        // Nahi baduzu irudia ere ezabatu diskotik:
        // if ($obra->irudia && str_starts_with($obra->irudia, '/storage/')) {
        //     Storage::disk('public')->delete(str_replace('/storage/', '', $obra->irudia));
        // }
        $obra->delete();
        return back()->with('success', 'Obra ondo ezabatu da!');
    }

    // --- MEZUA EZABATU (Berria) ---
    public function destroyKontaktua($id)
    {
        Kontaktua::findOrFail($id)->delete();
        return back()->with('success', 'Mezua ezabatu da!');
    }
}