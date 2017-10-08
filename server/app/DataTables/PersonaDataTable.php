<?php

namespace App\DataTables;

use App\Models\Persona;
use Form;
use Yajra\Datatables\Services\DataTable;

class PersonaDataTable extends DataTable
{

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function ajax()
    {
        return $this->datatables
            ->eloquent($this->query())
            ->addColumn('action', 'personas.datatables_actions')
            ->make(true);
    }

    /**
     * Get the query object to be processed by datatables.
     *
     * @return \Illuminate\Database\Query\Builder|\Illuminate\Database\Eloquent\Builder
     */
    public function query()
    {
        $personas = Persona::query();

        return $this->applyScopes($personas);
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
            'nombre1' => ['name' => 'nombre1', 'data' => 'nombre1'],
            'nombre2' => ['name' => 'nombre2', 'data' => 'nombre2'],
            'apellido1' => ['name' => 'apellido1', 'data' => 'apellido1'],
            'apellido2' => ['name' => 'apellido2', 'data' => 'apellido2'],
            'fono_casa' => ['name' => 'fono_casa', 'data' => 'fono_casa'],
            'fono_trabajo' => ['name' => 'fono_trabajo', 'data' => 'fono_trabajo'],
            'movil' => ['name' => 'movil', 'data' => 'movil'],
            'idGenero' => ['name' => 'idGenero', 'data' => 'idGenero'],
            'EstadoCivil_idEstado' => ['name' => 'EstadoCivil_idEstado', 'data' => 'EstadoCivil_idEstado'],
            'Comuna_idComuna' => ['name' => 'Comuna_idComuna', 'data' => 'Comuna_idComuna'],
            'Usuario_email' => ['name' => 'Usuario_email', 'data' => 'Usuario_email'],
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
        return 'personas';
    }
}
