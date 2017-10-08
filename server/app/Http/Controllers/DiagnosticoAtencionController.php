<?php

namespace App\Http\Controllers;

use App\DataTables\DiagnosticoAtencionDataTable;
use App\Http\Requests;
use App\Http\Requests\CreateDiagnosticoAtencionRequest;
use App\Http\Requests\UpdateDiagnosticoAtencionRequest;
use App\Repositories\DiagnosticoAtencionRepository;
use Flash;
use App\Http\Controllers\AppBaseController;
use Response;

class DiagnosticoAtencionController extends AppBaseController
{
    /** @var  DiagnosticoAtencionRepository */
    private $diagnosticoAtencionRepository;

    public function __construct(DiagnosticoAtencionRepository $diagnosticoAtencionRepo)
    {
        $this->diagnosticoAtencionRepository = $diagnosticoAtencionRepo;
    }

    /**
     * Display a listing of the DiagnosticoAtencion.
     *
     * @param DiagnosticoAtencionDataTable $diagnosticoAtencionDataTable
     * @return Response
     */
    public function index(DiagnosticoAtencionDataTable $diagnosticoAtencionDataTable)
    {
        return $diagnosticoAtencionDataTable->render('diagnostico_atencions.index');
    }

    /**
     * Show the form for creating a new DiagnosticoAtencion.
     *
     * @return Response
     */
    public function create()
    {
        return view('diagnostico_atencions.create');
    }

    /**
     * Store a newly created DiagnosticoAtencion in storage.
     *
     * @param CreateDiagnosticoAtencionRequest $request
     *
     * @return Response
     */
    public function store(CreateDiagnosticoAtencionRequest $request)
    {
        $input = $request->all();

        $diagnosticoAtencion = $this->diagnosticoAtencionRepository->create($input);

        Flash::success('Diagnostico Atencion saved successfully.');

        return redirect(route('diagnosticoAtencions.index'));
    }

    /**
     * Display the specified DiagnosticoAtencion.
     *
     * @param  int $id
     *
     * @return Response
     */
    public function show($id)
    {
        $diagnosticoAtencion = $this->diagnosticoAtencionRepository->findWithoutFail($id);

        if (empty($diagnosticoAtencion)) {
            Flash::error('Diagnostico Atencion not found');

            return redirect(route('diagnosticoAtencions.index'));
        }

        return view('diagnostico_atencions.show')->with('diagnosticoAtencion', $diagnosticoAtencion);
    }

    /**
     * Show the form for editing the specified DiagnosticoAtencion.
     *
     * @param  int $id
     *
     * @return Response
     */
    public function edit($id)
    {
        $diagnosticoAtencion = $this->diagnosticoAtencionRepository->findWithoutFail($id);

        if (empty($diagnosticoAtencion)) {
            Flash::error('Diagnostico Atencion not found');

            return redirect(route('diagnosticoAtencions.index'));
        }

        return view('diagnostico_atencions.edit')->with('diagnosticoAtencion', $diagnosticoAtencion);
    }

    /**
     * Update the specified DiagnosticoAtencion in storage.
     *
     * @param  int              $id
     * @param UpdateDiagnosticoAtencionRequest $request
     *
     * @return Response
     */
    public function update($id, UpdateDiagnosticoAtencionRequest $request)
    {
        $diagnosticoAtencion = $this->diagnosticoAtencionRepository->findWithoutFail($id);

        if (empty($diagnosticoAtencion)) {
            Flash::error('Diagnostico Atencion not found');

            return redirect(route('diagnosticoAtencions.index'));
        }

        $diagnosticoAtencion = $this->diagnosticoAtencionRepository->update($request->all(), $id);

        Flash::success('Diagnostico Atencion updated successfully.');

        return redirect(route('diagnosticoAtencions.index'));
    }

    /**
     * Remove the specified DiagnosticoAtencion from storage.
     *
     * @param  int $id
     *
     * @return Response
     */
    public function destroy($id)
    {
        $diagnosticoAtencion = $this->diagnosticoAtencionRepository->findWithoutFail($id);

        if (empty($diagnosticoAtencion)) {
            Flash::error('Diagnostico Atencion not found');

            return redirect(route('diagnosticoAtencions.index'));
        }

        $this->diagnosticoAtencionRepository->delete($id);

        Flash::success('Diagnostico Atencion deleted successfully.');

        return redirect(route('diagnosticoAtencions.index'));
    }
}
