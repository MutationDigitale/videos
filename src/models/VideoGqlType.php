<?php

namespace dukt\videos\models;

use craft\gql\GqlEntityRegistry;
use fruitstudios\linkit\generators\LinkitType;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

/**
 * Class VideoGqlType
 * @package dukt\videos\models
 */
class VideoGqlType
{
    /**
     * @return string
     */
    public static function getName(): string
    {
        return 'videoField_Video';
    }

    /**
     * @return Type
     */
    public static function getType()
    {
        if ($type = GqlEntityRegistry::getEntity(self::class)) {
            return $type;
        }

        $type = GqlEntityRegistry::createEntity(
            self::class,
            new ObjectType(
                [
                    'name' => static::getName(),
                    'fields' => self::class . '::getFieldDefinitions',
                ]
            )
        );

        return $type;
    }

    /**
     * @return array
     */
    public static function getFieldDefinitions(): array
    {
        return [
            'url' => [
                'name' => 'url',
                'type' => Type::string()
            ],
            'embed' => [
                'name' => 'embed',
                'type' => Type::string()
            ],
            'gatewayHandle' => [
                'name' => 'gatewayHandle',
                'type' => Type::string()
            ],
            'gatewayName' => [
                'name' => 'gatewayName',
                'type' => Type::string()
            ],
            'plays' => [
                'name' => 'plays',
                'type' => Type::int()
            ],
            'durationSeconds' => [
                'name' => 'durationSeconds',
                'type' => Type::int()
            ],
            'authorName' => [
                'name' => 'authorName',
                'type' => Type::string()
            ],
            'authorUrl' => [
                'name' => 'authorUrl',
                'type' => Type::string()
            ],
            'authorUsername' => [
                'name' => 'authorUsername',
                'type' => Type::string()
            ],
            'thumbnailSource' => [
                'name' => 'thumbnailSource',
                'type' => Type::string()
            ],
            'thumbnailLargeSource' => [
                'name' => 'thumbnailLargeSource',
                'type' => Type::string()
            ],
            'title' => [
                'name' => 'title',
                'type' => Type::string()
            ],
            'description' => [
                'name' => 'description',
                'type' => Type::string()
            ],
            'width' => [
                'name' => 'width',
                'type' => Type::int()
            ],
            'height' => [
                'name' => 'height',
                'type' => Type::int()
            ],
        ];
    }
}
