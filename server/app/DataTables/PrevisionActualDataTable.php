<?php

namespace App\DataTables;

use App\Models\PrevisionActual;
use Form;
use Yajra\Datatables\Services\DataTable;

class PrevisionActualDataTable extends DataTable
{

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function ajax()
    {
        return $this->datatables
            ->eloquent($this->query())
            ->addColumn('action', 'prevision_actuals.datatables_actions')
            ->make(true);
    }

    /**
     * Get the query object to be processed by datatables.
     *
     * @return \Illuminate\Database\Query\Builder|\Illuminate\Database\Eloquent\Builder
     */
    public function query()
    {
        $previsionActuals = PrevisionActual::query();

        return $this->applyScopes($previsionActuals);
    }

    /**
     * Optional method if you want to use html builder.
     *
     * @return \Yajra\Datatables\Html\Builder
     */
    public function html()
    {
        return $this->builder()
            ->columns($this->getColumns())
            ->addAction(['width' => '10%'])
            ->ajax('')
            ->parameters([
                'dom' => 'Bfrtip',
                'scrollX' => false,
                'buttons' => [
                    'print',
                    'reset',
                    'reload',
                    [
                         'extend'  => 'collection',
                         'text'    => '<i class="fa fa-download"></i> Export',
                         'buttons' => [
                             'csv',
                             'excel',
                             'pdf',
                         ],
                    ],
                    'colvis'
                ]
            ]);
    }

    /**
     * Get columns.
     *
     * @return array
     */
    private function getColumns()
    {
        return [
            'Persona_rut' => ['name' => 'Persona_rut', 'data' => 'Persona_rut'],
            'fechaActualizacion' => ['name' => 'fechaActualizacion', 'data' => 'fechaActualizacion'],
            'Prevision_idPrevision' => ['name' => 'Prevision_idPrevision', 'data' => 'Prevision_idPrevision']
        ];
    }

    /**
     * Get filename for export.
     *
     * @return string
     */
    protected function filename()
    {
        return 'previsionActuals';
    }
}
