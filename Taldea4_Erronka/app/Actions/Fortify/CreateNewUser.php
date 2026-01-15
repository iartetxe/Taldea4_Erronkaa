<?php

namespace App\Actions\Fortify;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Laravel\Fortify\Contracts\CreatesNewUsers;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules;

    /**
     * Validate and create a newly registered user.
     *
     * @param  array<string, string>  $input
     */
    public function create(array $input): User
    {
        Validator::make($input, [
            'izena' => ['required', 'string', 'max:255'],
            'abizenak' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'telefonoa' => ['required', 'string', 'max:20'],
            'kalea' => ['required', 'string', 'max:255'],
            'hiria' => ['required', 'string', 'max:255'],
            'password' => $this->passwordRules(),
        ])->validate();

        return User::create([
            'izena' => $input['izena'],
            'abizenak' => $input['abizenak'],
            'email' => $input['email'],
            'telefonoa' => $input['telefonoa'],
            'kalea' => $input['kalea'],
            'hiria' => $input['hiria'],
            'rola' => 'Erabiltzailea', // <--- Hau da garrantzitsuena
            'password' => Hash::make($input['password']),
        ]);
    }
}