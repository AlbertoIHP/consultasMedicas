<?php

use App\Models\HabitosSexualesPaciente;
use App\Repositories\HabitosSexualesPacienteRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class HabitosSexualesPacienteRepositoryTest extends TestCase
{
    use MakeHabitosSexualesPacienteTrait, ApiTestTrait, DatabaseTransactions;

    /**
     * @var HabitosSexualesPacienteRepository
     */
    protected $habitosSexualesPacienteRepo;

    public function setUp()
    {
        parent::setUp();
        $this->habitosSexualesPacienteRepo = App::make(HabitosSexualesPacienteRepository::class);
    }

    /**
     * @test create
     */
    public function testCreateHabitosSexualesPaciente()
    {
        $habitosSexualesPaciente = $this->fakeHabitosSexualesPacienteData();
        $createdHabitosSexualesPaciente = $this->habitosSexualesPacienteRepo->create($habitosSexualesPaciente);
        $createdHabitosSexualesPaciente = $createdHabitosSexualesPaciente->toArray();
        $this->assertArrayHasKey('id', $createdHabitosSexualesPaciente);
        $this->assertNotNull($createdHabitosSexualesPaciente['id'], 'Created HabitosSexualesPaciente must have id specified');
        $this->assertNotNull(HabitosSexualesPaciente::find($createdHabitosSexualesPaciente['id']), 'HabitosSexualesPaciente with given id must be in DB');
        $this->assertModelData($habitosSexualesPaciente, $createdHabitosSexualesPaciente);
    }

    /**
     * @test read
     */
    public function testReadHabitosSexualesPaciente()
    {
        $habitosSexualesPaciente = $this->makeHabitosSexualesPaciente();
        $dbHabitosSexualesPaciente = $this->habitosSexualesPacienteRepo->find($habitosSexualesPaciente->id);
        $dbHabitosSexualesPaciente = $dbHabitosSexualesPaciente->toArray();
        $this->assertModelData($habitosSexualesPaciente->toArray(), $dbHabitosSexualesPaciente);
    }

    /**
     * @test update
     */
    public function testUpdateHabitosSexualesPaciente()
    {
        $habitosSexualesPaciente = $this->makeHabitosSexualesPaciente();
        $fakeHabitosSexualesPaciente = $this->fakeHabitosSexualesPacienteData();
        $updatedHabitosSexualesPaciente = $this->habitosSexualesPacienteRepo->update($fakeHabitosSexualesPaciente, $habitosSexualesPaciente->id);
        $this->assertModelData($fakeHabitosSexualesPaciente, $updatedHabitosSexualesPaciente->toArray());
        $dbHabitosSexualesPaciente = $this->habitosSexualesPacienteRepo->find($habitosSexualesPaciente->id);
        $this->assertModelData($fakeHabitosSexualesPaciente, $dbHabitosSexualesPaciente->toArray());
    }

    /**
     * @test delete
     */
    public function testDeleteHabitosSexualesPaciente()
    {
        $habitosSexualesPaciente = $this->makeHabitosSexualesPaciente();
        $resp = $this->habitosSexualesPacienteRepo->delete($habitosSexualesPaciente->id);
        $this->assertTrue($resp);
        $this->assertNull(HabitosSexualesPaciente::find($habitosSexualesPaciente->id), 'HabitosSexualesPaciente should not exist in DB');
    }
}
