<?php
/**
 * @return array
 */
function getCards()
{
    return [
        [
            "id" => 0,
            "title" => "Digitaal",
        ],
        [
            "id" => 1,
            "title" => "Schilderijtjes",
        ],
        [
            "id" => 2,
            "title" => "Kastje",
        ],
        [
            "id" => 3,
            "title" => "CareBot",
        ],
        [
            "id" => 4,
            "title" => "Schermvereniging En Garde Reservatie Website",
        ],
        [
            "id" => 5,
            "title" => "Website met hulpmiddelen voor mensen met een auditieve beperking",
        ]
    ];
}

/**
 * @param $id
 * @return mixed
 */
function getCardsDetails($id)
{
    $tags = [
        0 => [
            "title" => "Digitaal",
            "description" => "Hier zijn twee digitale tekeningen.",
        ],
        1 => [
            "title" => "Schilderijtjes",
            "description" => "4 schilderijtje",
        ],
        2 => [
            "title" => "Kastje",
            "description" => "Dit kastje heb ik gemaakt omdat ik wou kunnen lassen (en ook omdat ik een kastje wou hebben)",
        ],
        3 => [
            "title" => "CareBot",
            "description" => "We Care So You Don't Have To. De CareBot helpt jou met je dagelijkse pillen innemen en daar water bij te drinken. Zo verspil je in de ochtend niet tijd aan je pillen bij elkaar zoeken! Er is zelfs de mogelijkheid voor pillen die je niet een keer per dag neemt.",
        ],
        4 => [
            "title" => "Schermvereniging En Garde Reservatie Website",
            "description" => "In dit project maakte ik een reservatie systeem voor de verhuuring van schremproducten voor de scherm vereniging En Garde. Dit systeem werkte met 3 databases, en ik gebruikte sql, php, html en css. Mijn code kan je hier: https://github.com/soapinmysight/reserveringssysteem_engarde terug vinden, en een video met uitleg over de functionaliteiten van de website vind je hier: https://www.youtube.com/watch?v=KLmgvSJifv0.",
        ],
        5 => [
            "title" => "Website met hulpmiddelen voor mensen met een auditieve beperking",
            "description" => "Uit onderzoek blijkt dat mensen met een auditieve beperking minder sporten dan mensen zonder een auditieve beperking. Dat een auditieve beperking mensen zo belemmerd, kan echt niet meer. Sporten moet toegankelijker worden voor mensen met een auditieve beperking. Daarom maakte wij (ik en de andere leden in team 23) een website, met 4 webpages, die precies dat als doel hebben.
                Onze code kan je hier: https://github.com/RadiazOm/CLE3 terug vinden. De bovenste foto hieronder, is de gazamelijke homepage. Daaronder zie je mijn eigen pagina; een notitie pagina.",
        ],
    ];

    return $tags[$id];
}