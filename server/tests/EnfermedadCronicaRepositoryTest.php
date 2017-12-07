<?php

use App\Models\EnfermedadCronica;
use App\Repositories\EnfermedadCronicaRepository;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class EnfermedadCronicaRepositoryTest extends TestCase
{
    use MakeEnfermedadCronicaTrait, ApiTestTrait, DatabaseTransactions;

    /**
     * @var EnfermedadCronicaRepository
     */
    protected $enfermedadCronicaRepo;

    public function setUp()
    {
        parent::setUp();
        $this->enfermedadCronicaRepo = App::make(EnfermedadCronicaRepository::class);
    }

    /**
     * @test create
     */
    public function testCreateEnfermedadCronica()
    {
        $enfermedadCronica = $this->fakeEnfermedadCronicaData();
        $createdEnfermedadCronica = $this->enfermedadCronicaRepo->create($enfermedadCronica);
        $createdEnfermedadCronica = $createdEnfermedadCronica->toArray();
        $this->assertArrayHasKey('id', $createdEnfermedadCronica);
        $this->assertNotNull($createdEnfermedadCronica['id'], 'Created EnfermedadCronica must have id specified');
        $this->assertNotNull(EnfermedadCronica::find($createdEnfermedadCronica['id']), 'EnfermedadCronica with given id must be in DB');
        $this->assertModelData($enfermedadCronica, $createdEnfermedadCronica);
    }

    /**
     * @test read
     */
    public function testReadEnfermedadCronica()
    {
        $enfermedadCronica = $this->makeEnfermedadCronica();
        $dbEnfermedadCronica = $this->enfermedadCronicaRepo->find($enfermedadCronica->id);
        $dbEnfermedadCronica = $dbEnfermedadCronica->toArray();
        $this->assertModelData($enfermedadCronica->toArray(), $dbEnfermedadCronica);
    }

    /**
     * @test update
     */
    public function testUpdateEnfermedadCronica()
    {
        $enfermedadCronica = $this->makeEnfermedadCronica();
        $fakeEnfermedadCronica = $this->fakeEnfermedadCronicaData();
        $updatedEnfermedadCronica = $this->enfermedadCronicaRepo->update($fakeEnfermedadCronica, $enfermedadCronica->id);
        $this->assertModelData($fakeEnfermedadCronica, $updatedEnfermedadCronica->toArray());
        $dbEnfermedadCronica = $this->enfermedadCronicaRepo->find($enfermedadCronica->id);
        $this->assertModelData($fakeEnfermedadCronica, $dbEnfermedadCronica->toArray());
    }

    /**
     * @test delete
     */
    public function testDeleteEnfermedadCronica()
    {
        $enfermedadCronica = $this->makeEnfermedadCronica();
        $resp = $this->enfermedadCronicaRepo->delete($enfermedadCronica->id);
        $this->assertTrue($resp);
        $this->assertNull(EnfermedadCronica::find($enfermedadCronica->id), 'EnfermedadCronica should not exist in DB');
    }
}
