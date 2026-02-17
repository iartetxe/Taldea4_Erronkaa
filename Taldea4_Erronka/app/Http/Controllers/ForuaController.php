<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\ForuProposamena;
use Illuminate\Support\Facades\Auth;

class ForuaController extends Controller
{
    public function index()
    {
        return Inertia::render('Forua');
    }

    public function store(Request $request)
    {
        $request->validate([
            'izenburua' => 'required|string|max:255',
            'deskribapena' => 'required|string',
            'irudia' => 'required|image|max:5120', 
        ]);

        $path = $request->file('irudia')->store('foru_proposamenak', 'public');

        ForuProposamena::create([
            'user_id' => Auth::id(),
            'izenburua' => $request->izenburua,
            'deskribapena' => $request->deskribapena,
            'irudia' => '/storage/' . $path,
        ]);

        return back()->with('success', 'Zure obra ondo bidali da! Laster aztertuko dugu.');
    }
}