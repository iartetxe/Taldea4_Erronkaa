<?php

namespace App\Http\Controllers;

use App\Models\Obra;
use App\Models\Like;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class GaleriaController extends Controller
{
    // 1. GALERIA ERAKUTSI
    public function index()
    {
        // Obrak lortu, like kopuruarekin eta erabiltzaileak like eman dion markatuta
        $obrak = Obra::withCount('likes')->get()->map(function ($obra) {
            return [
                'id' => $obra->id,
                'izenburua' => $obra->izenburua,
                'artista' => $obra->artista,
                'irudia' => $obra->irudia, // Ruta osoa beharko litzateke agian
                'mota' => $obra->mota,
                'deskribapena' => $obra->deskribapena,
                'likes_count' => $obra->likes_count,
                'is_liked' => Auth::check() ? $obra->isLikedBy(Auth::user()) : false,
            ];
        });

        return Inertia::render('Galeria', [
            'obras' => $obrak // React-era bidaltzen dugu
        ]);
    }

    // 2. LIKE EMAN / KENDU (Toggle)
    public function toggleLike($id)
    {
        $user = Auth::user();
        if (!$user) return redirect()->back(); // Login gabe ezin da

        $like = Like::where('user_id', $user->id)->where('obra_id', $id)->first();

        if ($like) {
            $like->delete(); // Like bazuen, kendu
        } else {
            Like::create([
                'user_id' => $user->id,
                'obra_id' => $id
            ]); // Ez bazuen, sortu
        }

        return redirect()->back(); // Orrialdea freskatu datu berriekin
    }

    // 3. RANKING ORRIA
    public function ranking()
    {
        // 10 obra bozkatuenak lortu
        $topObras = Obra::withCount('likes')
            ->orderBy('likes_count', 'desc')
            ->take(10)
            ->get();

        return Inertia::render('Ranking', [
            'topObras' => $topObras
        ]);
    }
}