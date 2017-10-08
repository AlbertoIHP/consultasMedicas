<?php

namespace App\DataTables;

use App\Models\FichaMedica;
use Form;
use Yajra\Datatables\Services\DataTable;

class FichaMedicaDataTable extends DataTable
{

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function ajax()
    {
        return $this->datatables
            ->eloquent($this->query())
            ->addColumn('action', 'ficha_medicas.datatables_actions')
            ->make(true);
    }

    /**
     * Get the query object to be processed by datatables.
     *
     * @return \Illuminate\Database\Query\Builder|\Illuminate\Database\Eloquent\Builder
     */
    public function query()
    {
        $fichaMedicas = FichaMedica::query();

        return $this->applyScopes($fichaMedicas);
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
            'nombre' => ['name' => 'nombre', 'data' => 'nombre'],
            'Persona_rut' => ['name' => 'Persona_rut', 'data' => 'Persona_rut'],
            'nombreResponsable' => ['name' => 'nombreResponsable', 'data' => 'nombreResponsable'],
            'fechaCreacion' => ['name' => 'fechaCreacion', 'data' => 'fechaCreacion'],
            'remember_token' => ['name' => 'remember_token', 'data' => 'remember_token']
        ];
    }

    /**
     * Get filename for export.
     *
     * @return string
     */
    protected function filename()
    {
        return 'fichaMedicas';
    }
}
