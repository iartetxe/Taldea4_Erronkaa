<?php

use Illuminate\Support\Facades\Route;

// Captura cualquier ruta y carga la vista 'app' (donde vive React)
Route::get('/{any?}', function () {
    return view('app'); 
})->where('any', '.*');