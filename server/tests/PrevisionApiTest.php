<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class PrevisionApiTest extends TestCase
{
    use MakePrevisionTrait, ApiTestTrait, WithoutMiddleware, DatabaseTransactions;

    /**
     * @test
     */
    public function testCreatePrevision()
    {
        $prevision = $this->fakePrevisionData();
        $this->json('POST', '/api/v1/previsions', $prevision);

        $this->assertApiResponse($prevision);
    }

    /**
     * @test
     */
    public function testReadPrevision()
    {
        $prevision = $this->makePrevision();
        $this->json('GET', '/api/v1/previsions/'.$prevision->id);

        $this->assertApiResponse($prevision->toArray());
    }

    /**
     * @test
     */
    public function testUpdatePrevision()
    {
        $prevision = $this->makePrevision();
        $editedPrevision = $this->fakePrevisionData();

        $this->json('PUT', '/api/v1/previsions/'.$prevision->id, $editedPrevision);

        $this->assertApiResponse($editedPrevision);
    }

    /**
     * @test
     */
    public function testDeletePrevision()
    {
        $prevision = $this->makePrevision();
        $this->json('DELETE', '/api/v1/previsions/'.$prevision->id);

        $this->assertApiSuccess();
        $this->json('GET', '/api/v1/previsions/'.$prevision->id);

        $this->assertResponseStatus(404);
    }
}
