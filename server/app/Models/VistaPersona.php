<?php

namespace App\Models;

use Eloquent as Model;

class VistaPersona extends Model
{
     public function scopeFromView($query)
    {
        return $query->from('VistaPersona');
    }
}
