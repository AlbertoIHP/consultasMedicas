<?php

namespace App\Http\Controllers;

use App\DataTables\DisponibilidadDataTable;
use App\Http\Requests;
use App\Http\Requests\CreateDisponibilidadRequest;
use App\Http\Requests\UpdateDisponibilidadRequest;
use App\Repositories\DisponibilidadRepository;
use Flash;
use App\Http\Controllers\AppBaseController;
use Response;

class DisponibilidadController extends AppBaseController
{
    /** @var  DisponibilidadRepository */
    private $disponibilidadRepository;

    public function __construct(DisponibilidadRepository $disponibilidadRepo)
    {
        $this->disponibilidadRepository = $disponibilidadRepo;
    }

    /**
     * Display a listing of the Disponibilidad.
     *
     * @param DisponibilidadDataTable $disponibilidadDataTable
     * @return Response
     */
    public function index(DisponibilidadDataTable $disponibilidadDataTable)
    {
        return $disponibilidadDataTable->render('disponibilidads.index');
    }

    /**
     * Show the form for creating a new Disponibilidad.
     *
     * @return Response
     */
    public function create()
    {
        return view('disponibilidads.create');
    }

    /**
     * Store a newly created Disponibilidad in storage.
     *
     * @param CreateDisponibilidadRequest $request
     *
     * @return Response
     */
    public function store(CreateDisponibilidadRequest $request)
    {
        $input = $request->all();

        $disponibilidad = $this->disponibilidadRepository->create($input);

        Flash::success('Disponibilidad saved successfully.');

        return redirect(route('disponibilidads.index'));
    }

    /**
     * Display the specified Disponibilidad.
     *
     * @param  int $id
     *
     * @return Response
     */
    public function show($id)
    {
        $disponibilidad = $this->disponibilidadRepository->findWithoutFail($id);

        if (empty($disponibilidad)) {
            Flash::error('Disponibilidad not found');

            return redirect(route('disponibilidads.index'));
        }

        return view('disponibilidads.show')->with('disponibilidad', $disponibilidad);
    }

    /**
     * Show the form for editing the specified Disponibilidad.
     *
     * @param  int $id
     *
     * @return Response
     */
    public function edit($id)
    {
        $disponibilidad = $this->disponibilidadRepository->findWithoutFail($id);

        if (empty($disponibilidad)) {
            Flash::error('Disponibilidad not found');

            return redirect(route('disponibilidads.index'));
        }

        return view('disponibilidads.edit')->with('disponibilidad', $disponibilidad);
    }

    /**
     * Update the specified Disponibilidad in storage.
     *
     * @param  int              $id
     * @param UpdateDisponibilidadRequest $request
     *
     * @return Response
     */
    public function update($id, UpdateDisponibilidadRequest $request)
    {
        $disponibilidad = $this->disponibilidadRepository->findWithoutFail($id);

        if (empty($disponibilidad)) {
            Flash::error('Disponibilidad not found');

            return redirect(route('disponibilidads.index'));
        }

        $disponibilidad = $this->disponibilidadRepository->update($request->all(), $id);

        Flash::success('Disponibilidad updated successfully.');

        return redirect(route('disponibilidads.index'));
    }

    /**
     * Remove the specified Disponibilidad from storage.
     *
     * @param  int $id
     *
     * @return Response
     */
    public function destroy($id)
    {
        $disponibilidad = $this->disponibilidadRepository->findWithoutFail($id);

        if (empty($disponibilidad)) {
            Flash::error('Disponibilidad not found');

            return redirect(route('disponibilidads.index'));
        }

        $this->disponibilidadRepository->delete($id);

        Flash::success('Disponibilidad deleted successfully.');

        return redirect(route('disponibilidads.index'));
    }
}
