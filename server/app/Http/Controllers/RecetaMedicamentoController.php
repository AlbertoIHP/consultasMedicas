<?php

namespace App\Http\Controllers;

use App\DataTables\RecetaMedicamentoDataTable;
use App\Http\Requests;
use App\Http\Requests\CreateRecetaMedicamentoRequest;
use App\Http\Requests\UpdateRecetaMedicamentoRequest;
use App\Repositories\RecetaMedicamentoRepository;
use Flash;
use App\Http\Controllers\AppBaseController;
use Response;

class RecetaMedicamentoController extends AppBaseController
{
    /** @var  RecetaMedicamentoRepository */
    private $recetaMedicamentoRepository;

    public function __construct(RecetaMedicamentoRepository $recetaMedicamentoRepo)
    {
        $this->recetaMedicamentoRepository = $recetaMedicamentoRepo;
    }

    /**
     * Display a listing of the RecetaMedicamento.
     *
     * @param RecetaMedicamentoDataTable $recetaMedicamentoDataTable
     * @return Response
     */
    public function index(RecetaMedicamentoDataTable $recetaMedicamentoDataTable)
    {
        return $recetaMedicamentoDataTable->render('receta_medicamentos.index');
    }

    /**
     * Show the form for creating a new RecetaMedicamento.
     *
     * @return Response
     */
    public function create()
    {
        return view('receta_medicamentos.create');
    }

    /**
     * Store a newly created RecetaMedicamento in storage.
     *
     * @param CreateRecetaMedicamentoRequest $request
     *
     * @return Response
     */
    public function store(CreateRecetaMedicamentoRequest $request)
    {
        $input = $request->all();

        $recetaMedicamento = $this->recetaMedicamentoRepository->create($input);

        Flash::success('Receta Medicamento saved successfully.');

        return redirect(route('recetaMedicamentos.index'));
    }

    /**
     * Display the specified RecetaMedicamento.
     *
     * @param  int $id
     *
     * @return Response
     */
    public function show($id)
    {
        $recetaMedicamento = $this->recetaMedicamentoRepository->findWithoutFail($id);

        if (empty($recetaMedicamento)) {
            Flash::error('Receta Medicamento not found');

            return redirect(route('recetaMedicamentos.index'));
        }

        return view('receta_medicamentos.show')->with('recetaMedicamento', $recetaMedicamento);
    }

    /**
     * Show the form for editing the specified RecetaMedicamento.
     *
     * @param  int $id
     *
     * @return Response
     */
    public function edit($id)
    {
        $recetaMedicamento = $this->recetaMedicamentoRepository->findWithoutFail($id);

        if (empty($recetaMedicamento)) {
            Flash::error('Receta Medicamento not found');

            return redirect(route('recetaMedicamentos.index'));
        }

        return view('receta_medicamentos.edit')->with('recetaMedicamento', $recetaMedicamento);
    }

    /**
     * Update the specified RecetaMedicamento in storage.
     *
     * @param  int              $id
     * @param UpdateRecetaMedicamentoRequest $request
     *
     * @return Response
     */
    public function update($id, UpdateRecetaMedicamentoRequest $request)
    {
        $recetaMedicamento = $this->recetaMedicamentoRepository->findWithoutFail($id);

        if (empty($recetaMedicamento)) {
            Flash::error('Receta Medicamento not found');

            return redirect(route('recetaMedicamentos.index'));
        }

        $recetaMedicamento = $this->recetaMedicamentoRepository->update($request->all(), $id);

        Flash::success('Receta Medicamento updated successfully.');

        return redirect(route('recetaMedicamentos.index'));
    }

    /**
     * Remove the specified RecetaMedicamento from storage.
     *
     * @param  int $id
     *
     * @return Response
     */
    public function destroy($id)
    {
        $recetaMedicamento = $this->recetaMedicamentoRepository->findWithoutFail($id);

        if (empty($recetaMedicamento)) {
            Flash::error('Receta Medicamento not found');

            return redirect(route('recetaMedicamentos.index'));
        }

        $this->recetaMedicamentoRepository->delete($id);

        Flash::success('Receta Medicamento deleted successfully.');

        return redirect(route('recetaMedicamentos.index'));
    }
}
