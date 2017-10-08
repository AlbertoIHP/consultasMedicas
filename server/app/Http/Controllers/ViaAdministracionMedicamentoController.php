<?php

namespace App\Http\Controllers;

use App\DataTables\ViaAdministracionMedicamentoDataTable;
use App\Http\Requests;
use App\Http\Requests\CreateViaAdministracionMedicamentoRequest;
use App\Http\Requests\UpdateViaAdministracionMedicamentoRequest;
use App\Repositories\ViaAdministracionMedicamentoRepository;
use Flash;
use App\Http\Controllers\AppBaseController;
use Response;

class ViaAdministracionMedicamentoController extends AppBaseController
{
    /** @var  ViaAdministracionMedicamentoRepository */
    private $viaAdministracionMedicamentoRepository;

    public function __construct(ViaAdministracionMedicamentoRepository $viaAdministracionMedicamentoRepo)
    {
        $this->viaAdministracionMedicamentoRepository = $viaAdministracionMedicamentoRepo;
    }

    /**
     * Display a listing of the ViaAdministracionMedicamento.
     *
     * @param ViaAdministracionMedicamentoDataTable $viaAdministracionMedicamentoDataTable
     * @return Response
     */
    public function index(ViaAdministracionMedicamentoDataTable $viaAdministracionMedicamentoDataTable)
    {
        return $viaAdministracionMedicamentoDataTable->render('via_administracion_medicamentos.index');
    }

    /**
     * Show the form for creating a new ViaAdministracionMedicamento.
     *
     * @return Response
     */
    public function create()
    {
        return view('via_administracion_medicamentos.create');
    }

    /**
     * Store a newly created ViaAdministracionMedicamento in storage.
     *
     * @param CreateViaAdministracionMedicamentoRequest $request
     *
     * @return Response
     */
    public function store(CreateViaAdministracionMedicamentoRequest $request)
    {
        $input = $request->all();

        $viaAdministracionMedicamento = $this->viaAdministracionMedicamentoRepository->create($input);

        Flash::success('Via Administracion Medicamento saved successfully.');

        return redirect(route('viaAdministracionMedicamentos.index'));
    }

    /**
     * Display the specified ViaAdministracionMedicamento.
     *
     * @param  int $id
     *
     * @return Response
     */
    public function show($id)
    {
        $viaAdministracionMedicamento = $this->viaAdministracionMedicamentoRepository->findWithoutFail($id);

        if (empty($viaAdministracionMedicamento)) {
            Flash::error('Via Administracion Medicamento not found');

            return redirect(route('viaAdministracionMedicamentos.index'));
        }

        return view('via_administracion_medicamentos.show')->with('viaAdministracionMedicamento', $viaAdministracionMedicamento);
    }

    /**
     * Show the form for editing the specified ViaAdministracionMedicamento.
     *
     * @param  int $id
     *
     * @return Response
     */
    public function edit($id)
    {
        $viaAdministracionMedicamento = $this->viaAdministracionMedicamentoRepository->findWithoutFail($id);

        if (empty($viaAdministracionMedicamento)) {
            Flash::error('Via Administracion Medicamento not found');

            return redirect(route('viaAdministracionMedicamentos.index'));
        }

        return view('via_administracion_medicamentos.edit')->with('viaAdministracionMedicamento', $viaAdministracionMedicamento);
    }

    /**
     * Update the specified ViaAdministracionMedicamento in storage.
     *
     * @param  int              $id
     * @param UpdateViaAdministracionMedicamentoRequest $request
     *
     * @return Response
     */
    public function update($id, UpdateViaAdministracionMedicamentoRequest $request)
    {
        $viaAdministracionMedicamento = $this->viaAdministracionMedicamentoRepository->findWithoutFail($id);

        if (empty($viaAdministracionMedicamento)) {
            Flash::error('Via Administracion Medicamento not found');

            return redirect(route('viaAdministracionMedicamentos.index'));
        }

        $viaAdministracionMedicamento = $this->viaAdministracionMedicamentoRepository->update($request->all(), $id);

        Flash::success('Via Administracion Medicamento updated successfully.');

        return redirect(route('viaAdministracionMedicamentos.index'));
    }

    /**
     * Remove the specified ViaAdministracionMedicamento from storage.
     *
     * @param  int $id
     *
     * @return Response
     */
    public function destroy($id)
    {
        $viaAdministracionMedicamento = $this->viaAdministracionMedicamentoRepository->findWithoutFail($id);

        if (empty($viaAdministracionMedicamento)) {
            Flash::error('Via Administracion Medicamento not found');

            return redirect(route('viaAdministracionMedicamentos.index'));
        }

        $this->viaAdministracionMedicamentoRepository->delete($id);

        Flash::success('Via Administracion Medicamento deleted successfully.');

        return redirect(route('viaAdministracionMedicamentos.index'));
    }
}
