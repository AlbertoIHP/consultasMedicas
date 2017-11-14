<?php

namespace App\Http\Controllers;

use App\DataTables\MedicoDataTable;
use App\Http\Requests;
use App\Http\Requests\CreateMedicoRequest;
use App\Http\Requests\UpdateMedicoRequest;
use App\Repositories\MedicoRepository;
use Flash;
use App\Http\Controllers\AppBaseController;
use Response;

class MedicoController extends AppBaseController
{
    /** @var  MedicoRepository */
    private $medicoRepository;

    public function __construct(MedicoRepository $medicoRepo)
    {
        $this->medicoRepository = $medicoRepo;
    }

    /**
     * Display a listing of the Medico.
     *
     * @param MedicoDataTable $medicoDataTable
     * @return Response
     */
    public function index(MedicoDataTable $medicoDataTable)
    {
        return $medicoDataTable->render('medicos.index');
    }

    /**
     * Show the form for creating a new Medico.
     *
     * @return Response
     */
    public function create()
    {
        return view('medicos.create');
    }

    /**
     * Store a newly created Medico in storage.
     *
     * @param CreateMedicoRequest $request
     *
     * @return Response
     */
    public function store(CreateMedicoRequest $request)
    {
        $input = $request->all();

        $medico = $this->medicoRepository->create($input);

        Flash::success('Medico saved successfully.');

        return redirect(route('medicos.index'));
    }

    /**
     * Display the specified Medico.
     *
     * @param  int $id
     *
     * @return Response
     */
    public function show($id)
    {
        $medico = $this->medicoRepository->findWithoutFail($id);

        if (empty($medico)) {
            Flash::error('Medico not found');

            return redirect(route('medicos.index'));
        }

        return view('medicos.show')->with('medico', $medico);
    }

    /**
     * Show the form for editing the specified Medico.
     *
     * @param  int $id
     *
     * @return Response
     */
    public function edit($id)
    {
        $medico = $this->medicoRepository->findWithoutFail($id);

        if (empty($medico)) {
            Flash::error('Medico not found');

            return redirect(route('medicos.index'));
        }

        return view('medicos.edit')->with('medico', $medico);
    }

    /**
     * Update the specified Medico in storage.
     *
     * @param  int              $id
     * @param UpdateMedicoRequest $request
     *
     * @return Response
     */
    public function update($id, UpdateMedicoRequest $request)
    {
        $medico = $this->medicoRepository->findWithoutFail($id);

        if (empty($medico)) {
            Flash::error('Medico not found');

            return redirect(route('medicos.index'));
        }

        $medico = $this->medicoRepository->update($request->all(), $id);

        Flash::success('Medico updated successfully.');

        return redirect(route('medicos.index'));
    }

    /**
     * Remove the specified Medico from storage.
     *
     * @param  int $id
     *
     * @return Response
     */
    public function destroy($id)
    {
        $medico = $this->medicoRepository->findWithoutFail($id);

        if (empty($medico)) {
            Flash::error('Medico not found');

            return redirect(route('medicos.index'));
        }

        $this->medicoRepository->delete($id);

        Flash::success('Medico deleted successfully.');

        return redirect(route('medicos.index'));
    }
}
