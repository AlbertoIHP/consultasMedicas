<?php

namespace App\Http\Controllers;

use App\DataTables\AtentionDataTable;
use App\Http\Requests;
use App\Http\Requests\CreateAtentionRequest;
use App\Http\Requests\UpdateAtentionRequest;
use App\Repositories\AtentionRepository;
use Flash;
use App\Http\Controllers\AppBaseController;
use Response;

class AtentionController extends AppBaseController
{
    /** @var  AtentionRepository */
    private $atentionRepository;

    public function __construct(AtentionRepository $atentionRepo)
    {
        $this->atentionRepository = $atentionRepo;
    }

    /**
     * Display a listing of the Atention.
     *
     * @param AtentionDataTable $atentionDataTable
     * @return Response
     */
    public function index(AtentionDataTable $atentionDataTable)
    {
        return $atentionDataTable->render('atentions.index');
    }

    /**
     * Show the form for creating a new Atention.
     *
     * @return Response
     */
    public function create()
    {
        return view('atentions.create');
    }

    /**
     * Store a newly created Atention in storage.
     *
     * @param CreateAtentionRequest $request
     *
     * @return Response
     */
    public function store(CreateAtentionRequest $request)
    {
        $input = $request->all();

        $atention = $this->atentionRepository->create($input);

        Flash::success('Atention saved successfully.');

        return redirect(route('atentions.index'));
    }

    /**
     * Display the specified Atention.
     *
     * @param  int $id
     *
     * @return Response
     */
    public function show($id)
    {
        $atention = $this->atentionRepository->findWithoutFail($id);

        if (empty($atention)) {
            Flash::error('Atention not found');

            return redirect(route('atentions.index'));
        }

        return view('atentions.show')->with('atention', $atention);
    }

    /**
     * Show the form for editing the specified Atention.
     *
     * @param  int $id
     *
     * @return Response
     */
    public function edit($id)
    {
        $atention = $this->atentionRepository->findWithoutFail($id);

        if (empty($atention)) {
            Flash::error('Atention not found');

            return redirect(route('atentions.index'));
        }

        return view('atentions.edit')->with('atention', $atention);
    }

    /**
     * Update the specified Atention in storage.
     *
     * @param  int              $id
     * @param UpdateAtentionRequest $request
     *
     * @return Response
     */
    public function update($id, UpdateAtentionRequest $request)
    {
        $atention = $this->atentionRepository->findWithoutFail($id);

        if (empty($atention)) {
            Flash::error('Atention not found');

            return redirect(route('atentions.index'));
        }

        $atention = $this->atentionRepository->update($request->all(), $id);

        Flash::success('Atention updated successfully.');

        return redirect(route('atentions.index'));
    }

    /**
     * Remove the specified Atention from storage.
     *
     * @param  int $id
     *
     * @return Response
     */
    public function destroy($id)
    {
        $atention = $this->atentionRepository->findWithoutFail($id);

        if (empty($atention)) {
            Flash::error('Atention not found');

            return redirect(route('atentions.index'));
        }

        $this->atentionRepository->delete($id);

        Flash::success('Atention deleted successfully.');

        return redirect(route('atentions.index'));
    }
}
