<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Obra;

class AdminController extends Controller
{
    public function dashboard()
    {
        // Datu-basetik estatistikak lortzen ditugu
        $stats = [
            'erabiltzaileak' => User::count(),
            'obrak_guztira' => Obra::count(),
            'enkantean' => Obra::whereNotNull('enkante_amaiera')->count(),
            'salmentak' => Obra::whereNotNull('irabazlea_id')->count(),
        ];

        // Azken obrak ere bidaliko ditugu zerrendan ikusteko
        $azkenObrak = Obra::latest()->take(5)->get();

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'azkenObrak' => $azkenObrak
        ]);
    }
}