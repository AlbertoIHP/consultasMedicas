<?php

use App\Models\EstadoCita;
use App\Repositories\EstadoCitaRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class EstadoCitaRepositoryTest extends TestCase
{
    use MakeEstadoCitaTrait, ApiTestTrait, DatabaseTransactions;

    /**
     * @var EstadoCitaRepository
     */
    protected $estadoCitaRepo;

    public function setUp()
    {
        parent::setUp();
        $this->estadoCitaRepo = App::make(EstadoCitaRepository::class);
    }

    /**
     * @test create
     */
    public function testCreateEstadoCita()
    {
        $estadoCita = $this->fakeEstadoCitaData();
        $createdEstadoCita = $this->estadoCitaRepo->create($estadoCita);
        $createdEstadoCita = $createdEstadoCita->toArray();
        $this->assertArrayHasKey('id', $createdEstadoCita);
        $this->assertNotNull($createdEstadoCita['id'], 'Created EstadoCita must have id specified');
        $this->assertNotNull(EstadoCita::find($createdEstadoCita['id']), 'EstadoCita with given id must be in DB');
        $this->assertModelData($estadoCita, $createdEstadoCita);
    }

    /**
     * @test read
     */
    public function testReadEstadoCita()
    {
        $estadoCita = $this->makeEstadoCita();
        $dbEstadoCita = $this->estadoCitaRepo->find($estadoCita->id);
        $dbEstadoCita = $dbEstadoCita->toArray();
        $this->assertModelData($estadoCita->toArray(), $dbEstadoCita);
    }

    /**
     * @test update
     */
    public function testUpdateEstadoCita()
    {
        $estadoCita = $this->makeEstadoCita();
        $fakeEstadoCita = $this->fakeEstadoCitaData();
        $updatedEstadoCita = $this->estadoCitaRepo->update($fakeEstadoCita, $estadoCita->id);
        $this->assertModelData($fakeEstadoCita, $updatedEstadoCita->toArray());
        $dbEstadoCita = $this->estadoCitaRepo->find($estadoCita->id);
        $this->assertModelData($fakeEstadoCita, $dbEstadoCita->toArray());
    }

    /**
     * @test delete
     */
    public function testDeleteEstadoCita()
    {
        $estadoCita = $this->makeEstadoCita();
        $resp = $this->estadoCitaRepo->delete($estadoCita->id);
        $this->assertTrue($resp);
        $this->assertNull(EstadoCita::find($estadoCita->id), 'EstadoCita should not exist in DB');
    }
}
