<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Aprovador extends Model
{
    use HasFactory;

    protected $table = 'aprovadores';

    protected $fillable = [
        'nome',
        'email',
        'setor_id',
        'id_user',
        'isAprovador',
    ];

    public function setor()
    {
        return $this->belongsTo(Setor::class, 'setor_id');
    }
}

