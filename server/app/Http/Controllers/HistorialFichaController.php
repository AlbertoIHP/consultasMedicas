<?php

namespace App\Http\Controllers;

use App\DataTables\HistorialFichaDataTable;
use App\Http\Requests;
use App\Http\Requests\CreateHistorialFichaRequest;
use App\Http\Requests\UpdateHistorialFichaRequest;
use App\Repositories\HistorialFichaRepository;
use Flash;
use App\Http\Controllers\AppBaseController;
use Response;

class HistorialFichaController extends AppBaseController
{
    /** @var  HistorialFichaRepository */
    private $historialFichaRepository;

    public function __construct(HistorialFichaRepository $historialFichaRepo)
    {
        $this->historialFichaRepository = $historialFichaRepo;
    }

    /**
     * Display a listing of the HistorialFicha.
     *
     * @param HistorialFichaDataTable $historialFichaDataTable
     * @return Response
     */
    public function index(HistorialFichaDataTable $historialFichaDataTable)
    {
        return $historialFichaDataTable->render('historial_fichas.index');
    }

    /**
     * Show the form for creating a new HistorialFicha.
     *
     * @return Response
     */
    public function create()
    {
        return view('historial_fichas.create');
    }

    /**
     * Store a newly created HistorialFicha in storage.
     *
     * @param CreateHistorialFichaRequest $request
     *
     * @return Response
     */
    public function store(CreateHistorialFichaRequest $request)
    {
        $input = $request->all();

        $historialFicha = $this->historialFichaRepository->create($input);

        Flash::success('Historial Ficha saved successfully.');

        return redirect(route('historialFichas.index'));
    }

    /**
     * Display the specified HistorialFicha.
     *
     * @param  int $id
     *
     * @return Response
     */
    public function show($id)
    {
        $historialFicha = $this->historialFichaRepository->findWithoutFail($id);

        if (empty($historialFicha)) {
            Flash::error('Historial Ficha not found');

            return redirect(route('historialFichas.index'));
        }

        return view('historial_fichas.show')->with('historialFicha', $historialFicha);
    }

    /**
     * Show the form for editing the specified HistorialFicha.
     *
     * @param  int $id
     *
     * @return Response
     */
    public function edit($id)
    {
        $historialFicha = $this->historialFichaRepository->findWithoutFail($id);

        if (empty($historialFicha)) {
            Flash::error('Historial Ficha not found');

            return redirect(route('historialFichas.index'));
        }

        return view('historial_fichas.edit')->with('historialFicha', $historialFicha);
    }

    /**
     * Update the specified HistorialFicha in storage.
     *
     * @param  int              $id
     * @param UpdateHistorialFichaRequest $request
     *
     * @return Response
     */
    public function update($id, UpdateHistorialFichaRequest $request)
    {
        $historialFicha = $this->historialFichaRepository->findWithoutFail($id);

        if (empty($historialFicha)) {
            Flash::error('Historial Ficha not found');

            return redirect(route('historialFichas.index'));
        }

        $historialFicha = $this->historialFichaRepository->update($request->all(), $id);

        Flash::success('Historial Ficha updated successfully.');

        return redirect(route('historialFichas.index'));
    }

    /**
     * Remove the specified HistorialFicha from storage.
     *
     * @param  int $id
     *
     * @return Response
     */
    public function destroy($id)
    {
        $historialFicha = $this->historialFichaRepository->findWithoutFail($id);

        if (empty($historialFicha)) {
            Flash::error('Historial Ficha not found');

            return redirect(route('historialFichas.index'));
        }

        $this->historialFichaRepository->delete($id);

        Flash::success('Historial Ficha deleted successfully.');

        return redirect(route('historialFichas.index'));
    }
}
