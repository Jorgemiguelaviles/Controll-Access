<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Setor extends Model
{
    use HasFactory;

    protected $table = 'setores';

    protected $fillable = [
        'nome',
        'DescricaoDepartamento',
        'status',
    ];

    public function aprovadores()
    {
        return $this->hasMany(Aprovador::class, 'setor_id');
    }
}
