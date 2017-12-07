<?php

use App\Models\AlergiasMedicamentosPaciente;
use App\Repositories\AlergiasMedicamentosPacienteRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class AlergiasMedicamentosPacienteRepositoryTest extends TestCase
{
    use MakeAlergiasMedicamentosPacienteTrait, ApiTestTrait, DatabaseTransactions;

    /**
     * @var AlergiasMedicamentosPacienteRepository
     */
    protected $alergiasMedicamentosPacienteRepo;

    public function setUp()
    {
        parent::setUp();
        $this->alergiasMedicamentosPacienteRepo = App::make(AlergiasMedicamentosPacienteRepository::class);
    }

    /**
     * @test create
     */
    public function testCreateAlergiasMedicamentosPaciente()
    {
        $alergiasMedicamentosPaciente = $this->fakeAlergiasMedicamentosPacienteData();
        $createdAlergiasMedicamentosPaciente = $this->alergiasMedicamentosPacienteRepo->create($alergiasMedicamentosPaciente);
        $createdAlergiasMedicamentosPaciente = $createdAlergiasMedicamentosPaciente->toArray();
        $this->assertArrayHasKey('id', $createdAlergiasMedicamentosPaciente);
        $this->assertNotNull($createdAlergiasMedicamentosPaciente['id'], 'Created AlergiasMedicamentosPaciente must have id specified');
        $this->assertNotNull(AlergiasMedicamentosPaciente::find($createdAlergiasMedicamentosPaciente['id']), 'AlergiasMedicamentosPaciente with given id must be in DB');
        $this->assertModelData($alergiasMedicamentosPaciente, $createdAlergiasMedicamentosPaciente);
    }

    /**
     * @test read
     */
    public function testReadAlergiasMedicamentosPaciente()
    {
        $alergiasMedicamentosPaciente = $this->makeAlergiasMedicamentosPaciente();
        $dbAlergiasMedicamentosPaciente = $this->alergiasMedicamentosPacienteRepo->find($alergiasMedicamentosPaciente->id);
        $dbAlergiasMedicamentosPaciente = $dbAlergiasMedicamentosPaciente->toArray();
        $this->assertModelData($alergiasMedicamentosPaciente->toArray(), $dbAlergiasMedicamentosPaciente);
    }

    /**
     * @test update
     */
    public function testUpdateAlergiasMedicamentosPaciente()
    {
        $alergiasMedicamentosPaciente = $this->makeAlergiasMedicamentosPaciente();
        $fakeAlergiasMedicamentosPaciente = $this->fakeAlergiasMedicamentosPacienteData();
        $updatedAlergiasMedicamentosPaciente = $this->alergiasMedicamentosPacienteRepo->update($fakeAlergiasMedicamentosPaciente, $alergiasMedicamentosPaciente->id);
        $this->assertModelData($fakeAlergiasMedicamentosPaciente, $updatedAlergiasMedicamentosPaciente->toArray());
        $dbAlergiasMedicamentosPaciente = $this->alergiasMedicamentosPacienteRepo->find($alergiasMedicamentosPaciente->id);
        $this->assertModelData($fakeAlergiasMedicamentosPaciente, $dbAlergiasMedicamentosPaciente->toArray());
    }

    /**
     * @test delete
     */
    public function testDeleteAlergiasMedicamentosPaciente()
    {
        $alergiasMedicamentosPaciente = $this->makeAlergiasMedicamentosPaciente();
        $resp = $this->alergiasMedicamentosPacienteRepo->delete($alergiasMedicamentosPaciente->id);
        $this->assertTrue($resp);
        $this->assertNull(AlergiasMedicamentosPaciente::find($alergiasMedicamentosPaciente->id), 'AlergiasMedicamentosPaciente should not exist in DB');
    }
}
