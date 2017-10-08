<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseTransactions;

class AtentionApiTest extends TestCase
{
    use MakeAtentionTrait, ApiTestTrait, WithoutMiddleware, DatabaseTransactions;

    /**
     * @test
     */
    public function testCreateAtention()
    {
        $atention = $this->fakeAtentionData();
        $this->json('POST', '/api/v1/atentions', $atention);

        $this->assertApiResponse($atention);
    }

    /**
     * @test
     */
    public function testReadAtention()
    {
        $atention = $this->makeAtention();
        $this->json('GET', '/api/v1/atentions/'.$atention->id);

        $this->assertApiResponse($atention->toArray());
    }

    /**
     * @test
     */
    public function testUpdateAtention()
    {
        $atention = $this->makeAtention();
        $editedAtention = $this->fakeAtentionData();

        $this->json('PUT', '/api/v1/atentions/'.$atention->id, $editedAtention);

        $this->assertApiResponse($editedAtention);
    }

    /**
     * @test
     */
    public function testDeleteAtention()
    {
        $atention = $this->makeAtention();
        $this->json('DELETE', '/api/v1/atentions/'.$atention->id);

        $this->assertApiSuccess();
        $this->json('GET', '/api/v1/atentions/'.$atention->id);

        $this->assertResponseStatus(404);
    }
}
