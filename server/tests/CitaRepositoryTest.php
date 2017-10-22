<?php

use App\Models\Cita;
use App\Repositories\CitaRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class CitaRepositoryTest extends TestCase
{
    use MakeCitaTrait, ApiTestTrait, DatabaseTransactions;

    /**
     * @var CitaRepository
     */
    protected $citaRepo;

    public function setUp()
    {
        parent::setUp();
        $this->citaRepo = App::make(CitaRepository::class);
    }

    /**
     * @test create
     */
    public function testCreateCita()
    {
        $cita = $this->fakeCitaData();
        $createdCita = $this->citaRepo->create($cita);
        $createdCita = $createdCita->toArray();
        $this->assertArrayHasKey('id', $createdCita);
        $this->assertNotNull($createdCita['id'], 'Created Cita must have id specified');
        $this->assertNotNull(Cita::find($createdCita['id']), 'Cita with given id must be in DB');
        $this->assertModelData($cita, $createdCita);
    }

    /**
     * @test read
     */
    public function testReadCita()
    {
        $cita = $this->makeCita();
        $dbCita = $this->citaRepo->find($cita->id);
        $dbCita = $dbCita->toArray();
        $this->assertModelData($cita->toArray(), $dbCita);
    }

    /**
     * @test update
     */
    public function testUpdateCita()
    {
        $cita = $this->makeCita();
        $fakeCita = $this->fakeCitaData();
        $updatedCita = $this->citaRepo->update($fakeCita, $cita->id);
        $this->assertModelData($fakeCita, $updatedCita->toArray());
        $dbCita = $this->citaRepo->find($cita->id);
        $this->assertModelData($fakeCita, $dbCita->toArray());
    }

    /**
     * @test delete
     */
    public function testDeleteCita()
    {
        $cita = $this->makeCita();
        $resp = $this->citaRepo->delete($cita->id);
        $this->assertTrue($resp);
        $this->assertNull(Cita::find($cita->id), 'Cita should not exist in DB');
    }
}
