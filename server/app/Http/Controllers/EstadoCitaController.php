<?php

namespace App\Http\Controllers;

use App\DataTables\EstadoCitaDataTable;
use App\Http\Requests;
use App\Http\Requests\CreateEstadoCitaRequest;
use App\Http\Requests\UpdateEstadoCitaRequest;
use App\Repositories\EstadoCitaRepository;
use Flash;
use App\Http\Controllers\AppBaseController;
use Response;

class EstadoCitaController extends AppBaseController
{
    /** @var  EstadoCitaRepository */
    private $estadoCitaRepository;

    public function __construct(EstadoCitaRepository $estadoCitaRepo)
    {
        $this->estadoCitaRepository = $estadoCitaRepo;
    }

    /**
     * Display a listing of the EstadoCita.
     *
     * @param EstadoCitaDataTable $estadoCitaDataTable
     * @return Response
     */
    public function index(EstadoCitaDataTable $estadoCitaDataTable)
    {
        return $estadoCitaDataTable->render('estado_citas.index');
    }

    /**
     * Show the form for creating a new EstadoCita.
     *
     * @return Response
     */
    public function create()
    {
        return view('estado_citas.create');
    }

    /**
     * Store a newly created EstadoCita in storage.
     *
     * @param CreateEstadoCitaRequest $request
     *
     * @return Response
     */
    public function store(CreateEstadoCitaRequest $request)
    {
        $input = $request->all();

        $estadoCita = $this->estadoCitaRepository->create($input);

        Flash::success('Estado Cita saved successfully.');

        return redirect(route('estadoCitas.index'));
    }

    /**
     * Display the specified EstadoCita.
     *
     * @param  int $id
     *
     * @return Response
     */
    public function show($id)
    {
        $estadoCita = $this->estadoCitaRepository->findWithoutFail($id);

        if (empty($estadoCita)) {
            Flash::error('Estado Cita not found');

            return redirect(route('estadoCitas.index'));
        }

        return view('estado_citas.show')->with('estadoCita', $estadoCita);
    }

    /**
     * Show the form for editing the specified EstadoCita.
     *
     * @param  int $id
     *
     * @return Response
     */
    public function edit($id)
    {
        $estadoCita = $this->estadoCitaRepository->findWithoutFail($id);

        if (empty($estadoCita)) {
            Flash::error('Estado Cita not found');

            return redirect(route('estadoCitas.index'));
        }

        return view('estado_citas.edit')->with('estadoCita', $estadoCita);
    }

    /**
     * Update the specified EstadoCita in storage.
     *
     * @param  int              $id
     * @param UpdateEstadoCitaRequest $request
     *
     * @return Response
     */
    public function update($id, UpdateEstadoCitaRequest $request)
    {
        $estadoCita = $this->estadoCitaRepository->findWithoutFail($id);

        if (empty($estadoCita)) {
            Flash::error('Estado Cita not found');

            return redirect(route('estadoCitas.index'));
        }

        $estadoCita = $this->estadoCitaRepository->update($request->all(), $id);

        Flash::success('Estado Cita updated successfully.');

        return redirect(route('estadoCitas.index'));
    }

    /**
     * Remove the specified EstadoCita from storage.
     *
     * @param  int $id
     *
     * @return Response
     */
    public function destroy($id)
    {
        $estadoCita = $this->estadoCitaRepository->findWithoutFail($id);

        if (empty($estadoCita)) {
            Flash::error('Estado Cita not found');

            return redirect(route('estadoCitas.index'));
        }

        $this->estadoCitaRepository->delete($id);

        Flash::success('Estado Cita deleted successfully.');

        return redirect(route('estadoCitas.index'));
    }
}
