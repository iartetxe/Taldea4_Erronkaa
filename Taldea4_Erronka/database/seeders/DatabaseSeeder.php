<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Usuarios de prueba (Admin y Normal)
        User::create([
            'izena' => 'Admin',         
            'abizenak' => 'Nagusia',     
            'hiria' => 'Bilbo',          
            'kalea' => 'Kale Nagusia 1', 
            'telefonoa' => '667588463',
            'email' => 'admin@artetxea.com',
            'password' => Hash::make('admin123'),
            'rola' => 'Administratzailea',
        ]);

        User::create([
            'izena' => 'Mikel',
            'abizenak' => 'Testa',
            'hiria' => 'Gasteiz',
            'kalea' => 'Dato Kalea 15',
            'telefonoa' => '667778463',
            'email' => 'mikel@gmail.com',
            'password' => Hash::make('12345678'),
            'rola' => 'Erabiltzailea',
        ]);
        
        // 2. IMPORTANTE: Llamar al Seeder de Obras
        // Si esta línea falta, la base de datos se queda vacía de obras
        $this->call(ObrasSeeder::class);
    }
}