<?php

namespace App\Http\Controllers;

use App\DataTables\TipoBoxDataTable;
use App\Http\Requests;
use App\Http\Requests\CreateTipoBoxRequest;
use App\Http\Requests\UpdateTipoBoxRequest;
use App\Repositories\TipoBoxRepository;
use Flash;
use App\Http\Controllers\AppBaseController;
use Response;

class TipoBoxController extends AppBaseController
{
    /** @var  TipoBoxRepository */
    private $tipoBoxRepository;

    public function __construct(TipoBoxRepository $tipoBoxRepo)
    {
        $this->tipoBoxRepository = $tipoBoxRepo;
    }

    /**
     * Display a listing of the TipoBox.
     *
     * @param TipoBoxDataTable $tipoBoxDataTable
     * @return Response
     */
    public function index(TipoBoxDataTable $tipoBoxDataTable)
    {
        return $tipoBoxDataTable->render('tipo_boxes.index');
    }

    /**
     * Show the form for creating a new TipoBox.
     *
     * @return Response
     */
    public function create()
    {
        return view('tipo_boxes.create');
    }

    /**
     * Store a newly created TipoBox in storage.
     *
     * @param CreateTipoBoxRequest $request
     *
     * @return Response
     */
    public function store(CreateTipoBoxRequest $request)
    {
        $input = $request->all();

        $tipoBox = $this->tipoBoxRepository->create($input);

        Flash::success('Tipo Box saved successfully.');

        return redirect(route('tipoBoxes.index'));
    }

    /**
     * Display the specified TipoBox.
     *
     * @param  int $id
     *
     * @return Response
     */
    public function show($id)
    {
        $tipoBox = $this->tipoBoxRepository->findWithoutFail($id);

        if (empty($tipoBox)) {
            Flash::error('Tipo Box not found');

            return redirect(route('tipoBoxes.index'));
        }

        return view('tipo_boxes.show')->with('tipoBox', $tipoBox);
    }

    /**
     * Show the form for editing the specified TipoBox.
     *
     * @param  int $id
     *
     * @return Response
     */
    public function edit($id)
    {
        $tipoBox = $this->tipoBoxRepository->findWithoutFail($id);

        if (empty($tipoBox)) {
            Flash::error('Tipo Box not found');

            return redirect(route('tipoBoxes.index'));
        }

        return view('tipo_boxes.edit')->with('tipoBox', $tipoBox);
    }

    /**
     * Update the specified TipoBox in storage.
     *
     * @param  int              $id
     * @param UpdateTipoBoxRequest $request
     *
     * @return Response
     */
    public function update($id, UpdateTipoBoxRequest $request)
    {
        $tipoBox = $this->tipoBoxRepository->findWithoutFail($id);

        if (empty($tipoBox)) {
            Flash::error('Tipo Box not found');

            return redirect(route('tipoBoxes.index'));
        }

        $tipoBox = $this->tipoBoxRepository->update($request->all(), $id);

        Flash::success('Tipo Box updated successfully.');

        return redirect(route('tipoBoxes.index'));
    }

    /**
     * Remove the specified TipoBox from storage.
     *
     * @param  int $id
     *
     * @return Response
     */
    public function destroy($id)
    {
        $tipoBox = $this->tipoBoxRepository->findWithoutFail($id);

        if (empty($tipoBox)) {
            Flash::error('Tipo Box not found');

            return redirect(route('tipoBoxes.index'));
        }

        $this->tipoBoxRepository->delete($id);

        Flash::success('Tipo Box deleted successfully.');

        return redirect(route('tipoBoxes.index'));
    }
}
