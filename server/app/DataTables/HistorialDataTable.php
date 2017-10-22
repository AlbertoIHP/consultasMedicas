<?php

namespace App\DataTables;

use App\Models\Historial;
use Form;
use Yajra\Datatables\Services\DataTable;

class HistorialDataTable extends DataTable
{

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function ajax()
    {
        return $this->datatables
            ->eloquent($this->query())
            ->addColumn('action', 'historials.datatables_actions')
            ->make(true);
    }

    /**
     * Get the query object to be processed by datatables.
     *
     * @return \Illuminate\Database\Query\Builder|\Illuminate\Database\Eloquent\Builder
     */
    public function query()
    {
        $historials = Historial::query();

        return $this->applyScopes($historials);
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
            'fechaConsulta' => ['name' => 'fechaConsulta', 'data' => 'fechaConsulta'],
            'informacionMedica' => ['name' => 'informacionMedica', 'data' => 'informacionMedica'],
            'FichaMedica_id' => ['name' => 'FichaMedica_id', 'data' => 'FichaMedica_id'],
            'habitos' => ['name' => 'habitos', 'data' => 'habitos'],
            'peso' => ['name' => 'peso', 'data' => 'peso'],
            'estatura' => ['name' => 'estatura', 'data' => 'estatura']
        ];
    }

    /**
     * Get filename for export.
     *
     * @return string
     */
    protected function filename()
    {
        return 'historials';
    }
}
