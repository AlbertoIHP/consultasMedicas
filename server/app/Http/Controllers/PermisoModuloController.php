<?php

namespace App\Http\Controllers;

use App\DataTables\PermisoModuloDataTable;
use App\Http\Requests;
use App\Http\Requests\CreatePermisoModuloRequest;
use App\Http\Requests\UpdatePermisoModuloRequest;
use App\Repositories\PermisoModuloRepository;
use Flash;
use App\Http\Controllers\AppBaseController;
use Response;

class PermisoModuloController extends AppBaseController
{
    /** @var  PermisoModuloRepository */
    private $permisoModuloRepository;

    public function __construct(PermisoModuloRepository $permisoModuloRepo)
    {
        $this->permisoModuloRepository = $permisoModuloRepo;
    }

    /**
     * Display a listing of the PermisoModulo.
     *
     * @param PermisoModuloDataTable $permisoModuloDataTable
     * @return Response
     */
    public function index(PermisoModuloDataTable $permisoModuloDataTable)
    {
        return $permisoModuloDataTable->render('permiso_modulos.index');
    }

    /**
     * Show the form for creating a new PermisoModulo.
     *
     * @return Response
     */
    public function create()
    {
        return view('permiso_modulos.create');
    }

    /**
     * Store a newly created PermisoModulo in storage.
     *
     * @param CreatePermisoModuloRequest $request
     *
     * @return Response
     */
    public function store(CreatePermisoModuloRequest $request)
    {
        $input = $request->all();

        $permisoModulo = $this->permisoModuloRepository->create($input);

        Flash::success('Permiso Modulo saved successfully.');

        return redirect(route('permisoModulos.index'));
    }

    /**
     * Display the specified PermisoModulo.
     *
     * @param  int $id
     *
     * @return Response
     */
    public function show($id)
    {
        $permisoModulo = $this->permisoModuloRepository->findWithoutFail($id);

        if (empty($permisoModulo)) {
            Flash::error('Permiso Modulo not found');

            return redirect(route('permisoModulos.index'));
        }

        return view('permiso_modulos.show')->with('permisoModulo', $permisoModulo);
    }

    /**
     * Show the form for editing the specified PermisoModulo.
     *
     * @param  int $id
     *
     * @return Response
     */
    public function edit($id)
    {
        $permisoModulo = $this->permisoModuloRepository->findWithoutFail($id);

        if (empty($permisoModulo)) {
            Flash::error('Permiso Modulo not found');

            return redirect(route('permisoModulos.index'));
        }

        return view('permiso_modulos.edit')->with('permisoModulo', $permisoModulo);
    }

    /**
     * Update the specified PermisoModulo in storage.
     *
     * @param  int              $id
     * @param UpdatePermisoModuloRequest $request
     *
     * @return Response
     */
    public function update($id, UpdatePermisoModuloRequest $request)
    {
        $permisoModulo = $this->permisoModuloRepository->findWithoutFail($id);

        if (empty($permisoModulo)) {
            Flash::error('Permiso Modulo not found');

            return redirect(route('permisoModulos.index'));
        }

        $permisoModulo = $this->permisoModuloRepository->update($request->all(), $id);

        Flash::success('Permiso Modulo updated successfully.');

        return redirect(route('permisoModulos.index'));
    }

    /**
     * Remove the specified PermisoModulo from storage.
     *
     * @param  int $id
     *
     * @return Response
     */
    public function destroy($id)
    {
        $permisoModulo = $this->permisoModuloRepository->findWithoutFail($id);

        if (empty($permisoModulo)) {
            Flash::error('Permiso Modulo not found');

            return redirect(route('permisoModulos.index'));
        }

        $this->permisoModuloRepository->delete($id);

        Flash::success('Permiso Modulo deleted successfully.');

        return redirect(route('permisoModulos.index'));
    }
}
