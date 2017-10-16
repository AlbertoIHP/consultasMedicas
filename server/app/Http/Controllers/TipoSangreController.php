<?php

namespace App\Http\Controllers;

use App\DataTables\TipoSangreDataTable;
use App\Http\Requests;
use App\Http\Requests\CreateTipoSangreRequest;
use App\Http\Requests\UpdateTipoSangreRequest;
use App\Repositories\TipoSangreRepository;
use Flash;
use App\Http\Controllers\AppBaseController;
use Response;

class TipoSangreController extends AppBaseController
{
    /** @var  TipoSangreRepository */
    private $tipoSangreRepository;

    public function __construct(TipoSangreRepository $tipoSangreRepo)
    {
        $this->tipoSangreRepository = $tipoSangreRepo;
    }

    /**
     * Display a listing of the TipoSangre.
     *
     * @param TipoSangreDataTable $tipoSangreDataTable
     * @return Response
     */
    public function index(TipoSangreDataTable $tipoSangreDataTable)
    {
        return $tipoSangreDataTable->render('tipo_sangres.index');
    }

    /**
     * Show the form for creating a new TipoSangre.
     *
     * @return Response
     */
    public function create()
    {
        return view('tipo_sangres.create');
    }

    /**
     * Store a newly created TipoSangre in storage.
     *
     * @param CreateTipoSangreRequest $request
     *
     * @return Response
     */
    public function store(CreateTipoSangreRequest $request)
    {
        $input = $request->all();

        $tipoSangre = $this->tipoSangreRepository->create($input);

        Flash::success('Tipo Sangre saved successfully.');

        return redirect(route('tipoSangres.index'));
    }

    /**
     * Display the specified TipoSangre.
     *
     * @param  int $id
     *
     * @return Response
     */
    public function show($id)
    {
        $tipoSangre = $this->tipoSangreRepository->findWithoutFail($id);

        if (empty($tipoSangre)) {
            Flash::error('Tipo Sangre not found');

            return redirect(route('tipoSangres.index'));
        }

        return view('tipo_sangres.show')->with('tipoSangre', $tipoSangre);
    }

    /**
     * Show the form for editing the specified TipoSangre.
     *
     * @param  int $id
     *
     * @return Response
     */
    public function edit($id)
    {
        $tipoSangre = $this->tipoSangreRepository->findWithoutFail($id);

        if (empty($tipoSangre)) {
            Flash::error('Tipo Sangre not found');

            return redirect(route('tipoSangres.index'));
        }

        return view('tipo_sangres.edit')->with('tipoSangre', $tipoSangre);
    }

    /**
     * Update the specified TipoSangre in storage.
     *
     * @param  int              $id
     * @param UpdateTipoSangreRequest $request
     *
     * @return Response
     */
    public function update($id, UpdateTipoSangreRequest $request)
    {
        $tipoSangre = $this->tipoSangreRepository->findWithoutFail($id);

        if (empty($tipoSangre)) {
            Flash::error('Tipo Sangre not found');

            return redirect(route('tipoSangres.index'));
        }

        $tipoSangre = $this->tipoSangreRepository->update($request->all(), $id);

        Flash::success('Tipo Sangre updated successfully.');

        return redirect(route('tipoSangres.index'));
    }

    /**
     * Remove the specified TipoSangre from storage.
     *
     * @param  int $id
     *
     * @return Response
     */
    public function destroy($id)
    {
        $tipoSangre = $this->tipoSangreRepository->findWithoutFail($id);

        if (empty($tipoSangre)) {
            Flash::error('Tipo Sangre not found');

            return redirect(route('tipoSangres.index'));
        }

        $this->tipoSangreRepository->delete($id);

        Flash::success('Tipo Sangre deleted successfully.');

        return redirect(route('tipoSangres.index'));
    }
}
