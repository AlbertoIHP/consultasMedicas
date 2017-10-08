<?php

namespace App\Http\Controllers;

use App\DataTables\MedicamentoDataTable;
use App\Http\Requests;
use App\Http\Requests\CreateMedicamentoRequest;
use App\Http\Requests\UpdateMedicamentoRequest;
use App\Repositories\MedicamentoRepository;
use Flash;
use App\Http\Controllers\AppBaseController;
use Response;

class MedicamentoController extends AppBaseController
{
    /** @var  MedicamentoRepository */
    private $medicamentoRepository;

    public function __construct(MedicamentoRepository $medicamentoRepo)
    {
        $this->medicamentoRepository = $medicamentoRepo;
    }

    /**
     * Display a listing of the Medicamento.
     *
     * @param MedicamentoDataTable $medicamentoDataTable
     * @return Response
     */
    public function index(MedicamentoDataTable $medicamentoDataTable)
    {
        return $medicamentoDataTable->render('medicamentos.index');
    }

    /**
     * Show the form for creating a new Medicamento.
     *
     * @return Response
     */
    public function create()
    {
        return view('medicamentos.create');
    }

    /**
     * Store a newly created Medicamento in storage.
     *
     * @param CreateMedicamentoRequest $request
     *
     * @return Response
     */
    public function store(CreateMedicamentoRequest $request)
    {
        $input = $request->all();

        $medicamento = $this->medicamentoRepository->create($input);

        Flash::success('Medicamento saved successfully.');

        return redirect(route('medicamentos.index'));
    }

    /**
     * Display the specified Medicamento.
     *
     * @param  int $id
     *
     * @return Response
     */
    public function show($id)
    {
        $medicamento = $this->medicamentoRepository->findWithoutFail($id);

        if (empty($medicamento)) {
            Flash::error('Medicamento not found');

            return redirect(route('medicamentos.index'));
        }

        return view('medicamentos.show')->with('medicamento', $medicamento);
    }

    /**
     * Show the form for editing the specified Medicamento.
     *
     * @param  int $id
     *
     * @return Response
     */
    public function edit($id)
    {
        $medicamento = $this->medicamentoRepository->findWithoutFail($id);

        if (empty($medicamento)) {
            Flash::error('Medicamento not found');

            return redirect(route('medicamentos.index'));
        }

        return view('medicamentos.edit')->with('medicamento', $medicamento);
    }

    /**
     * Update the specified Medicamento in storage.
     *
     * @param  int              $id
     * @param UpdateMedicamentoRequest $request
     *
     * @return Response
     */
    public function update($id, UpdateMedicamentoRequest $request)
    {
        $medicamento = $this->medicamentoRepository->findWithoutFail($id);

        if (empty($medicamento)) {
            Flash::error('Medicamento not found');

            return redirect(route('medicamentos.index'));
        }

        $medicamento = $this->medicamentoRepository->update($request->all(), $id);

        Flash::success('Medicamento updated successfully.');

        return redirect(route('medicamentos.index'));
    }

    /**
     * Remove the specified Medicamento from storage.
     *
     * @param  int $id
     *
     * @return Response
     */
    public function destroy($id)
    {
        $medicamento = $this->medicamentoRepository->findWithoutFail($id);

        if (empty($medicamento)) {
            Flash::error('Medicamento not found');

            return redirect(route('medicamentos.index'));
        }

        $this->medicamentoRepository->delete($id);

        Flash::success('Medicamento deleted successfully.');

        return redirect(route('medicamentos.index'));
    }
}
