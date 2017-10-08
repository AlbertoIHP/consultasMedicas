<?php

namespace App\Http\Controllers;

use App\DataTables\FichaMedicaDataTable;
use App\Http\Requests;
use App\Http\Requests\CreateFichaMedicaRequest;
use App\Http\Requests\UpdateFichaMedicaRequest;
use App\Repositories\FichaMedicaRepository;
use Flash;
use App\Http\Controllers\AppBaseController;
use Response;

class FichaMedicaController extends AppBaseController
{
    /** @var  FichaMedicaRepository */
    private $fichaMedicaRepository;

    public function __construct(FichaMedicaRepository $fichaMedicaRepo)
    {
        $this->fichaMedicaRepository = $fichaMedicaRepo;
    }

    /**
     * Display a listing of the FichaMedica.
     *
     * @param FichaMedicaDataTable $fichaMedicaDataTable
     * @return Response
     */
    public function index(FichaMedicaDataTable $fichaMedicaDataTable)
    {
        return $fichaMedicaDataTable->render('ficha_medicas.index');
    }

    /**
     * Show the form for creating a new FichaMedica.
     *
     * @return Response
     */
    public function create()
    {
        return view('ficha_medicas.create');
    }

    /**
     * Store a newly created FichaMedica in storage.
     *
     * @param CreateFichaMedicaRequest $request
     *
     * @return Response
     */
    public function store(CreateFichaMedicaRequest $request)
    {
        $input = $request->all();

        $fichaMedica = $this->fichaMedicaRepository->create($input);

        Flash::success('Ficha Medica saved successfully.');

        return redirect(route('fichaMedicas.index'));
    }

    /**
     * Display the specified FichaMedica.
     *
     * @param  int $id
     *
     * @return Response
     */
    public function show($id)
    {
        $fichaMedica = $this->fichaMedicaRepository->findWithoutFail($id);

        if (empty($fichaMedica)) {
            Flash::error('Ficha Medica not found');

            return redirect(route('fichaMedicas.index'));
        }

        return view('ficha_medicas.show')->with('fichaMedica', $fichaMedica);
    }

    /**
     * Show the form for editing the specified FichaMedica.
     *
     * @param  int $id
     *
     * @return Response
     */
    public function edit($id)
    {
        $fichaMedica = $this->fichaMedicaRepository->findWithoutFail($id);

        if (empty($fichaMedica)) {
            Flash::error('Ficha Medica not found');

            return redirect(route('fichaMedicas.index'));
        }

        return view('ficha_medicas.edit')->with('fichaMedica', $fichaMedica);
    }

    /**
     * Update the specified FichaMedica in storage.
     *
     * @param  int              $id
     * @param UpdateFichaMedicaRequest $request
     *
     * @return Response
     */
    public function update($id, UpdateFichaMedicaRequest $request)
    {
        $fichaMedica = $this->fichaMedicaRepository->findWithoutFail($id);

        if (empty($fichaMedica)) {
            Flash::error('Ficha Medica not found');

            return redirect(route('fichaMedicas.index'));
        }

        $fichaMedica = $this->fichaMedicaRepository->update($request->all(), $id);

        Flash::success('Ficha Medica updated successfully.');

        return redirect(route('fichaMedicas.index'));
    }

    /**
     * Remove the specified FichaMedica from storage.
     *
     * @param  int $id
     *
     * @return Response
     */
    public function destroy($id)
    {
        $fichaMedica = $this->fichaMedicaRepository->findWithoutFail($id);

        if (empty($fichaMedica)) {
            Flash::error('Ficha Medica not found');

            return redirect(route('fichaMedicas.index'));
        }

        $this->fichaMedicaRepository->delete($id);

        Flash::success('Ficha Medica deleted successfully.');

        return redirect(route('fichaMedicas.index'));
    }
}
