<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ForuProposamena extends Model
{
    use HasFactory;
    
    protected $table = 'foru_proposamenak';
    protected $fillable = ['user_id', 'izenburua', 'deskribapena', 'irudia'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}