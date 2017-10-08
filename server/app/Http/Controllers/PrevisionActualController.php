<?php

namespace App\Http\Controllers;

use App\DataTables\PrevisionActualDataTable;
use App\Http\Requests;
use App\Http\Requests\CreatePrevisionActualRequest;
use App\Http\Requests\UpdatePrevisionActualRequest;
use App\Repositories\PrevisionActualRepository;
use Flash;
use App\Http\Controllers\AppBaseController;
use Response;

class PrevisionActualController extends AppBaseController
{
    /** @var  PrevisionActualRepository */
    private $previsionActualRepository;

    public function __construct(PrevisionActualRepository $previsionActualRepo)
    {
        $this->previsionActualRepository = $previsionActualRepo;
    }

    /**
     * Display a listing of the PrevisionActual.
     *
     * @param PrevisionActualDataTable $previsionActualDataTable
     * @return Response
     */
    public function index(PrevisionActualDataTable $previsionActualDataTable)
    {
        return $previsionActualDataTable->render('prevision_actuals.index');
    }

    /**
     * Show the form for creating a new PrevisionActual.
     *
     * @return Response
     */
    public function create()
    {
        return view('prevision_actuals.create');
    }

    /**
     * Store a newly created PrevisionActual in storage.
     *
     * @param CreatePrevisionActualRequest $request
     *
     * @return Response
     */
    public function store(CreatePrevisionActualRequest $request)
    {
        $input = $request->all();

        $previsionActual = $this->previsionActualRepository->create($input);

        Flash::success('Prevision Actual saved successfully.');

        return redirect(route('previsionActuals.index'));
    }

    /**
     * Display the specified PrevisionActual.
     *
     * @param  int $id
     *
     * @return Response
     */
    public function show($id)
    {
        $previsionActual = $this->previsionActualRepository->findWithoutFail($id);

        if (empty($previsionActual)) {
            Flash::error('Prevision Actual not found');

            return redirect(route('previsionActuals.index'));
        }

        return view('prevision_actuals.show')->with('previsionActual', $previsionActual);
    }

    /**
     * Show the form for editing the specified PrevisionActual.
     *
     * @param  int $id
     *
     * @return Response
     */
    public function edit($id)
    {
        $previsionActual = $this->previsionActualRepository->findWithoutFail($id);

        if (empty($previsionActual)) {
            Flash::error('Prevision Actual not found');

            return redirect(route('previsionActuals.index'));
        }

        return view('prevision_actuals.edit')->with('previsionActual', $previsionActual);
    }

    /**
     * Update the specified PrevisionActual in storage.
     *
     * @param  int              $id
     * @param UpdatePrevisionActualRequest $request
     *
     * @return Response
     */
    public function update($id, UpdatePrevisionActualRequest $request)
    {
        $previsionActual = $this->previsionActualRepository->findWithoutFail($id);

        if (empty($previsionActual)) {
            Flash::error('Prevision Actual not found');

            return redirect(route('previsionActuals.index'));
        }

        $previsionActual = $this->previsionActualRepository->update($request->all(), $id);

        Flash::success('Prevision Actual updated successfully.');

        return redirect(route('previsionActuals.index'));
    }

    /**
     * Remove the specified PrevisionActual from storage.
     *
     * @param  int $id
     *
     * @return Response
     */
    public function destroy($id)
    {
        $previsionActual = $this->previsionActualRepository->findWithoutFail($id);

        if (empty($previsionActual)) {
            Flash::error('Prevision Actual not found');

            return redirect(route('previsionActuals.index'));
        }

        $this->previsionActualRepository->delete($id);

        Flash::success('Prevision Actual deleted successfully.');

        return redirect(route('previsionActuals.index'));
    }
}
