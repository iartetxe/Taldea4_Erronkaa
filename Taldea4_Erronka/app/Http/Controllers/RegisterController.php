<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Actions\Fortify\CreateNewUser;
use Illuminate\Auth\Events\Registered;

class RegisterController extends Controller
{
    public function store(Request $request, CreateNewUser $creator)
    {
        $user = $creator->create($request->all());

     
        event(new Registered($user));

    
        return redirect('/')->with('success', 'Kontua sortu da! Mesedez, begiratu zure posta elektronikoa (e-maila) kontua baieztatzeko.');
    }
}