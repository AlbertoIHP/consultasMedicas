<?php

namespace App\Http\Controllers;

use App\DataTables\DiagnosticoDataTable;
use App\Http\Requests;
use App\Http\Requests\CreateDiagnosticoRequest;
use App\Http\Requests\UpdateDiagnosticoRequest;
use App\Repositories\DiagnosticoRepository;
use Flash;
use App\Http\Controllers\AppBaseController;
use Response;

class DiagnosticoController extends AppBaseController
{
    /** @var  DiagnosticoRepository */
    private $diagnosticoRepository;

    public function __construct(DiagnosticoRepository $diagnosticoRepo)
    {
        $this->diagnosticoRepository = $diagnosticoRepo;
    }

    /**
     * Display a listing of the Diagnostico.
     *
     * @param DiagnosticoDataTable $diagnosticoDataTable
     * @return Response
     */
    public function index(DiagnosticoDataTable $diagnosticoDataTable)
    {
        return $diagnosticoDataTable->render('diagnosticos.index');
    }

    /**
     * Show the form for creating a new Diagnostico.
     *
     * @return Response
     */
    public function create()
    {
        return view('diagnosticos.create');
    }

    /**
     * Store a newly created Diagnostico in storage.
     *
     * @param CreateDiagnosticoRequest $request
     *
     * @return Response
     */
    public function store(CreateDiagnosticoRequest $request)
    {
        $input = $request->all();

        $diagnostico = $this->diagnosticoRepository->create($input);

        Flash::success('Diagnostico saved successfully.');

        return redirect(route('diagnosticos.index'));
    }

    /**
     * Display the specified Diagnostico.
     *
     * @param  int $id
     *
     * @return Response
     */
    public function show($id)
    {
        $diagnostico = $this->diagnosticoRepository->findWithoutFail($id);

        if (empty($diagnostico)) {
            Flash::error('Diagnostico not found');

            return redirect(route('diagnosticos.index'));
        }

        return view('diagnosticos.show')->with('diagnostico', $diagnostico);
    }

    /**
     * Show the form for editing the specified Diagnostico.
     *
     * @param  int $id
     *
     * @return Response
     */
    public function edit($id)
    {
        $diagnostico = $this->diagnosticoRepository->findWithoutFail($id);

        if (empty($diagnostico)) {
            Flash::error('Diagnostico not found');

            return redirect(route('diagnosticos.index'));
        }

        return view('diagnosticos.edit')->with('diagnostico', $diagnostico);
    }

    /**
     * Update the specified Diagnostico in storage.
     *
     * @param  int              $id
     * @param UpdateDiagnosticoRequest $request
     *
     * @return Response
     */
    public function update($id, UpdateDiagnosticoRequest $request)
    {
        $diagnostico = $this->diagnosticoRepository->findWithoutFail($id);

        if (empty($diagnostico)) {
            Flash::error('Diagnostico not found');

            return redirect(route('diagnosticos.index'));
        }

        $diagnostico = $this->diagnosticoRepository->update($request->all(), $id);

        Flash::success('Diagnostico updated successfully.');

        return redirect(route('diagnosticos.index'));
    }

    /**
     * Remove the specified Diagnostico from storage.
     *
     * @param  int $id
     *
     * @return Response
     */
    public function destroy($id)
    {
        $diagnostico = $this->diagnosticoRepository->findWithoutFail($id);

        if (empty($diagnostico)) {
            Flash::error('Diagnostico not found');

            return redirect(route('diagnosticos.index'));
        }

        $this->diagnosticoRepository->delete($id);

        Flash::success('Diagnostico deleted successfully.');

        return redirect(route('diagnosticos.index'));
    }
}
