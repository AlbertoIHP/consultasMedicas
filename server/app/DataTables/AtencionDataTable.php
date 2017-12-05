<?php

namespace App\DataTables;

use App\Models\Atencion;
use Form;
use Yajra\Datatables\Services\DataTable;

class AtencionDataTable extends DataTable
{

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function ajax()
    {
        return $this->datatables
            ->eloquent($this->query())
            ->addColumn('action', 'atencions.datatables_actions')
            ->make(true);
    }

    /**
     * Get the query object to be processed by datatables.
     *
     * @return \Illuminate\Database\Query\Builder|\Illuminate\Database\Eloquent\Builder
     */
    public function query()
    {
        $atencions = Atencion::query();

        return $this->applyScopes($atencions);
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
            'peso' => ['name' => 'peso', 'data' => 'peso'],
            'estatura' => ['name' => 'estatura', 'data' => 'estatura'],
            'calificacion' => ['name' => 'calificacion', 'data' => 'calificacion'],
            'BoxConsulta_id' => ['name' => 'BoxConsulta_id', 'data' => 'BoxConsulta_id'],
            'Cita_id' => ['name' => 'Cita_id', 'data' => 'Cita_id'],
            'Paciente_id' => ['name' => 'Paciente_id', 'data' => 'Paciente_id'],
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
        return 'atencions';
    }
}
