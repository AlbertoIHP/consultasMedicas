<?php

namespace App\Http\Controllers;

use App\DataTables\ModuloDataTable;
use App\Http\Requests;
use App\Http\Requests\CreateModuloRequest;
use App\Http\Requests\UpdateModuloRequest;
use App\Repositories\ModuloRepository;
use Flash;
use App\Http\Controllers\AppBaseController;
use Response;

class ModuloController extends AppBaseController
{
    /** @var  ModuloRepository */
    private $moduloRepository;

    public function __construct(ModuloRepository $moduloRepo)
    {
        $this->moduloRepository = $moduloRepo;
    }

    /**
     * Display a listing of the Modulo.
     *
     * @param ModuloDataTable $moduloDataTable
     * @return Response
     */
    public function index(ModuloDataTable $moduloDataTable)
    {
        return $moduloDataTable->render('modulos.index');
    }

    /**
     * Show the form for creating a new Modulo.
     *
     * @return Response
     */
    public function create()
    {
        return view('modulos.create');
    }

    /**
     * Store a newly created Modulo in storage.
     *
     * @param CreateModuloRequest $request
     *
     * @return Response
     */
    public function store(CreateModuloRequest $request)
    {
        $input = $request->all();

        $modulo = $this->moduloRepository->create($input);

        Flash::success('Modulo saved successfully.');

        return redirect(route('modulos.index'));
    }

    /**
     * Display the specified Modulo.
     *
     * @param  int $id
     *
     * @return Response
     */
    public function show($id)
    {
        $modulo = $this->moduloRepository->findWithoutFail($id);

        if (empty($modulo)) {
            Flash::error('Modulo not found');

            return redirect(route('modulos.index'));
        }

        return view('modulos.show')->with('modulo', $modulo);
    }

    /**
     * Show the form for editing the specified Modulo.
     *
     * @param  int $id
     *
     * @return Response
     */
    public function edit($id)
    {
        $modulo = $this->moduloRepository->findWithoutFail($id);

        if (empty($modulo)) {
            Flash::error('Modulo not found');

            return redirect(route('modulos.index'));
        }

        return view('modulos.edit')->with('modulo', $modulo);
    }

    /**
     * Update the specified Modulo in storage.
     *
     * @param  int              $id
     * @param UpdateModuloRequest $request
     *
     * @return Response
     */
    public function update($id, UpdateModuloRequest $request)
    {
        $modulo = $this->moduloRepository->findWithoutFail($id);

        if (empty($modulo)) {
            Flash::error('Modulo not found');

            return redirect(route('modulos.index'));
        }

        $modulo = $this->moduloRepository->update($request->all(), $id);

        Flash::success('Modulo updated successfully.');

        return redirect(route('modulos.index'));
    }

    /**
     * Remove the specified Modulo from storage.
     *
     * @param  int $id
     *
     * @return Response
     */
    public function destroy($id)
    {
        $modulo = $this->moduloRepository->findWithoutFail($id);

        if (empty($modulo)) {
            Flash::error('Modulo not found');

            return redirect(route('modulos.index'));
        }

        $this->moduloRepository->delete($id);

        Flash::success('Modulo deleted successfully.');

        return redirect(route('modulos.index'));
    }
}
