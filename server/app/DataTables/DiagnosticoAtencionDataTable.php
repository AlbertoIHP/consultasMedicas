<?php

namespace App\DataTables;

use App\Models\DiagnosticoAtencion;
use Form;
use Yajra\Datatables\Services\DataTable;

class DiagnosticoAtencionDataTable extends DataTable
{

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function ajax()
    {
        return $this->datatables
            ->eloquent($this->query())
            ->addColumn('action', 'diagnostico_atencions.datatables_actions')
            ->make(true);
    }

    /**
     * Get the query object to be processed by datatables.
     *
     * @return \Illuminate\Database\Query\Builder|\Illuminate\Database\Eloquent\Builder
     */
    public function query()
    {
        $diagnosticoAtencions = DiagnosticoAtencion::query();

        return $this->applyScopes($diagnosticoAtencions);
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
            'Atention_Cita_idCita' => ['name' => 'Atention_Cita_idCita', 'data' => 'Atention_Cita_idCita'],
            'Diagnostico_idDiagnostico' => ['name' => 'Diagnostico_idDiagnostico', 'data' => 'Diagnostico_idDiagnostico'],
            'Observacion' => ['name' => 'Observacion', 'data' => 'Observacion']
        ];
    }

    /**
     * Get filename for export.
     *
     * @return string
     */
    protected function filename()
    {
        return 'diagnosticoAtencions';
    }
}
