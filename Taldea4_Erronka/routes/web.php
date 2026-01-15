<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia; // <--- Importante: Importar Inertia

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// Ruta Principal
Route::get('/', function () {
    return Inertia::render('Hasiera');
})->name('hasiera');

// Rutas Públicas
Route::get('/forua', function () {
    return Inertia::render('Forua'); // Aquí pasarás los datos de la DB más adelante
})->name('forua');

Route::get('/ranking', function () {
    return Inertia::render('Ranking');
})->name('ranking');

Route::get('/galeria', function () {
    return Inertia::render('Galeria');
})->name('galeria');

Route::get('/kontaktua', function () {
    return Inertia::render('Kontaktua');
})->name('kontaktua');

// Rutas de Usuario (Auth)
Route::get('/erregistratu', function () {
    return Inertia::render('Erregistratu');
})->name('register');

Route::get('/erosketak', function () {
    return Inertia::render('Erosketak');
})->name('erosketak');

Route::get('/enkanteak', function () {
    return Inertia::render('Enkanteak');
})->name('enkanteak');

// Si tienes rutas de Fortify (login, logout), Laravel las gestiona automáticamente,
// pero asegúrate de que tus botones apunten a /login o /logout.