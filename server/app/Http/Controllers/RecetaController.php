<?php

namespace App\Http\Controllers;

use App\DataTables\RecetaDataTable;
use App\Http\Requests;
use App\Http\Requests\CreateRecetaRequest;
use App\Http\Requests\UpdateRecetaRequest;
use App\Repositories\RecetaRepository;
use Flash;
use App\Http\Controllers\AppBaseController;
use Response;

class RecetaController extends AppBaseController
{
    /** @var  RecetaRepository */
    private $recetaRepository;

    public function __construct(RecetaRepository $recetaRepo)
    {
        $this->recetaRepository = $recetaRepo;
    }

    /**
     * Display a listing of the Receta.
     *
     * @param RecetaDataTable $recetaDataTable
     * @return Response
     */
    public function index(RecetaDataTable $recetaDataTable)
    {
        return $recetaDataTable->render('recetas.index');
    }

    /**
     * Show the form for creating a new Receta.
     *
     * @return Response
     */
    public function create()
    {
        return view('recetas.create');
    }

    /**
     * Store a newly created Receta in storage.
     *
     * @param CreateRecetaRequest $request
     *
     * @return Response
     */
    public function store(CreateRecetaRequest $request)
    {
        $input = $request->all();

        $receta = $this->recetaRepository->create($input);

        Flash::success('Receta saved successfully.');

        return redirect(route('recetas.index'));
    }

    /**
     * Display the specified Receta.
     *
     * @param  int $id
     *
     * @return Response
     */
    public function show($id)
    {
        $receta = $this->recetaRepository->findWithoutFail($id);

        if (empty($receta)) {
            Flash::error('Receta not found');

            return redirect(route('recetas.index'));
        }

        return view('recetas.show')->with('receta', $receta);
    }

    /**
     * Show the form for editing the specified Receta.
     *
     * @param  int $id
     *
     * @return Response
     */
    public function edit($id)
    {
        $receta = $this->recetaRepository->findWithoutFail($id);

        if (empty($receta)) {
            Flash::error('Receta not found');

            return redirect(route('recetas.index'));
        }

        return view('recetas.edit')->with('receta', $receta);
    }

    /**
     * Update the specified Receta in storage.
     *
     * @param  int              $id
     * @param UpdateRecetaRequest $request
     *
     * @return Response
     */
    public function update($id, UpdateRecetaRequest $request)
    {
        $receta = $this->recetaRepository->findWithoutFail($id);

        if (empty($receta)) {
            Flash::error('Receta not found');

            return redirect(route('recetas.index'));
        }

        $receta = $this->recetaRepository->update($request->all(), $id);

        Flash::success('Receta updated successfully.');

        return redirect(route('recetas.index'));
    }

    /**
     * Remove the specified Receta from storage.
     *
     * @param  int $id
     *
     * @return Response
     */
    public function destroy($id)
    {
        $receta = $this->recetaRepository->findWithoutFail($id);

        if (empty($receta)) {
            Flash::error('Receta not found');

            return redirect(route('recetas.index'));
        }

        $this->recetaRepository->delete($id);

        Flash::success('Receta deleted successfully.');

        return redirect(route('recetas.index'));
    }
}
