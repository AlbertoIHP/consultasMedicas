<?php

namespace App\Http\Controllers\API;

use App\Models\VistaUsuario;
use Illuminate\Http\Request;
use App\Http\Controllers\AppBaseController;
use Response;

/**
 * Class VistaUsuarioController
 * @package App\Http\Controllers\API
 */

class VistaUsuarioAPIController extends AppBaseController
{

    public function index(Request $request)
    {
        $vista = VistaUsuario::fromView()->get();

        return $this->sendResponse($vista->toArray(), 'VistaUsuarios retrieved successfully');
    }

    public function show($id)
    {

        $vista = VistaUsuario::fromView()->where('id', '=', $id)->get();

        return $this->sendResponse($vista->toArray(), 'VistaUsuarios retrieved successfully');
    }
}