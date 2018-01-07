<?php

namespace App\Models;

use Eloquent as Model;

class VistaUsuario extends Model
{
    public function scopeFromView($query)
    {
        return $query->from('VistaUsuario');
    }
}