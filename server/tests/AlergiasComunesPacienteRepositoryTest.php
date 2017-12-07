<?php

use App\Models\AlergiasComunesPaciente;
use App\Repositories\AlergiasComunesPacienteRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class AlergiasComunesPacienteRepositoryTest extends TestCase
{
    use MakeAlergiasComunesPacienteTrait, ApiTestTrait, DatabaseTransactions;

    /**
     * @var AlergiasComunesPacienteRepository
     */
    protected $alergiasComunesPacienteRepo;

    public function setUp()
    {
        parent::setUp();
        $this->alergiasComunesPacienteRepo = App::make(AlergiasComunesPacienteRepository::class);
    }

    /**
     * @test create
     */
    public function testCreateAlergiasComunesPaciente()
    {
        $alergiasComunesPaciente = $this->fakeAlergiasComunesPacienteData();
        $createdAlergiasComunesPaciente = $this->alergiasComunesPacienteRepo->create($alergiasComunesPaciente);
        $createdAlergiasComunesPaciente = $createdAlergiasComunesPaciente->toArray();
        $this->assertArrayHasKey('id', $createdAlergiasComunesPaciente);
        $this->assertNotNull($createdAlergiasComunesPaciente['id'], 'Created AlergiasComunesPaciente must have id specified');
        $this->assertNotNull(AlergiasComunesPaciente::find($createdAlergiasComunesPaciente['id']), 'AlergiasComunesPaciente with given id must be in DB');
        $this->assertModelData($alergiasComunesPaciente, $createdAlergiasComunesPaciente);
    }

    /**
     * @test read
     */
    public function testReadAlergiasComunesPaciente()
    {
        $alergiasComunesPaciente = $this->makeAlergiasComunesPaciente();
        $dbAlergiasComunesPaciente = $this->alergiasComunesPacienteRepo->find($alergiasComunesPaciente->id);
        $dbAlergiasComunesPaciente = $dbAlergiasComunesPaciente->toArray();
        $this->assertModelData($alergiasComunesPaciente->toArray(), $dbAlergiasComunesPaciente);
    }

    /**
     * @test update
     */
    public function testUpdateAlergiasComunesPaciente()
    {
        $alergiasComunesPaciente = $this->makeAlergiasComunesPaciente();
        $fakeAlergiasComunesPaciente = $this->fakeAlergiasComunesPacienteData();
        $updatedAlergiasComunesPaciente = $this->alergiasComunesPacienteRepo->update($fakeAlergiasComunesPaciente, $alergiasComunesPaciente->id);
        $this->assertModelData($fakeAlergiasComunesPaciente, $updatedAlergiasComunesPaciente->toArray());
        $dbAlergiasComunesPaciente = $this->alergiasComunesPacienteRepo->find($alergiasComunesPaciente->id);
        $this->assertModelData($fakeAlergiasComunesPaciente, $dbAlergiasComunesPaciente->toArray());
    }

    /**
     * @test delete
     */
    public function testDeleteAlergiasComunesPaciente()
    {
        $alergiasComunesPaciente = $this->makeAlergiasComunesPaciente();
        $resp = $this->alergiasComunesPacienteRepo->delete($alergiasComunesPaciente->id);
        $this->assertTrue($resp);
        $this->assertNull(AlergiasComunesPaciente::find($alergiasComunesPaciente->id), 'AlergiasComunesPaciente should not exist in DB');
    }
}
