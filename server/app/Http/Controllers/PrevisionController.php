<?php

namespace App\Http\Controllers;

use App\DataTables\PrevisionDataTable;
use App\Http\Requests;
use App\Http\Requests\CreatePrevisionRequest;
use App\Http\Requests\UpdatePrevisionRequest;
use App\Repositories\PrevisionRepository;
use Flash;
use App\Http\Controllers\AppBaseController;
use Response;

class PrevisionController extends AppBaseController
{
    /** @var  PrevisionRepository */
    private $previsionRepository;

    public function __construct(PrevisionRepository $previsionRepo)
    {
        $this->previsionRepository = $previsionRepo;
    }

    /**
     * Display a listing of the Prevision.
     *
     * @param PrevisionDataTable $previsionDataTable
     * @return Response
     */
    public function index(PrevisionDataTable $previsionDataTable)
    {
        return $previsionDataTable->render('previsions.index');
    }

    /**
     * Show the form for creating a new Prevision.
     *
     * @return Response
     */
    public function create()
    {
        return view('previsions.create');
    }

    /**
     * Store a newly created Prevision in storage.
     *
     * @param CreatePrevisionRequest $request
     *
     * @return Response
     */
    public function store(CreatePrevisionRequest $request)
    {
        $input = $request->all();

        $prevision = $this->previsionRepository->create($input);

        Flash::success('Prevision saved successfully.');

        return redirect(route('previsions.index'));
    }

    /**
     * Display the specified Prevision.
     *
     * @param  int $id
     *
     * @return Response
     */
    public function show($id)
    {
        $prevision = $this->previsionRepository->findWithoutFail($id);

        if (empty($prevision)) {
            Flash::error('Prevision not found');

            return redirect(route('previsions.index'));
        }

        return view('previsions.show')->with('prevision', $prevision);
    }

    /**
     * Show the form for editing the specified Prevision.
     *
     * @param  int $id
     *
     * @return Response
     */
    public function edit($id)
    {
        $prevision = $this->previsionRepository->findWithoutFail($id);

        if (empty($prevision)) {
            Flash::error('Prevision not found');

            return redirect(route('previsions.index'));
        }

        return view('previsions.edit')->with('prevision', $prevision);
    }

    /**
     * Update the specified Prevision in storage.
     *
     * @param  int              $id
     * @param UpdatePrevisionRequest $request
     *
     * @return Response
     */
    public function update($id, UpdatePrevisionRequest $request)
    {
        $prevision = $this->previsionRepository->findWithoutFail($id);

        if (empty($prevision)) {
            Flash::error('Prevision not found');

            return redirect(route('previsions.index'));
        }

        $prevision = $this->previsionRepository->update($request->all(), $id);

        Flash::success('Prevision updated successfully.');

        return redirect(route('previsions.index'));
    }

    /**
     * Remove the specified Prevision from storage.
     *
     * @param  int $id
     *
     * @return Response
     */
    public function destroy($id)
    {
        $prevision = $this->previsionRepository->findWithoutFail($id);

        if (empty($prevision)) {
            Flash::error('Prevision not found');

            return redirect(route('previsions.index'));
        }

        $this->previsionRepository->delete($id);

        Flash::success('Prevision deleted successfully.');

        return redirect(route('previsions.index'));
    }
}
