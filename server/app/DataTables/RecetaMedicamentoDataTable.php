<?php

namespace App\DataTables;

use App\Models\RecetaMedicamento;
use Form;
use Yajra\Datatables\Services\DataTable;

class RecetaMedicamentoDataTable extends DataTable
{

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function ajax()
    {
        return $this->datatables
            ->eloquent($this->query())
            ->addColumn('action', 'receta_medicamentos.datatables_actions')
            ->make(true);
    }

    /**
     * Get the query object to be processed by datatables.
     *
     * @return \Illuminate\Database\Query\Builder|\Illuminate\Database\Eloquent\Builder
     */
    public function query()
    {
        $recetaMedicamentos = RecetaMedicamento::query();

        return $this->applyScopes($recetaMedicamentos);
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
            'Receta_idReceta' => ['name' => 'Receta_idReceta', 'data' => 'Receta_idReceta'],
            'Medicamento_idMedicamento' => ['name' => 'Medicamento_idMedicamento', 'data' => 'Medicamento_idMedicamento'],
            'Receta_has_Medicamentocol' => ['name' => 'Receta_has_Medicamentocol', 'data' => 'Receta_has_Medicamentocol'],
            'dosis' => ['name' => 'dosis', 'data' => 'dosis'],
            'cantidad' => ['name' => 'cantidad', 'data' => 'cantidad'],
            'tiempo' => ['name' => 'tiempo', 'data' => 'tiempo'],
            'intervalo' => ['name' => 'intervalo', 'data' => 'intervalo'],
            'ViaAdministracionMedicamento_idViaAdministracionMedicamento' => ['name' => 'ViaAdministracionMedicamento_idViaAdministracionMedicamento', 'data' => 'ViaAdministracionMedicamento_idViaAdministracionMedicamento']
        ];
    }

    /**
     * Get filename for export.
     *
     * @return string
     */
    protected function filename()
    {
        return 'recetaMedicamentos';
    }
}
