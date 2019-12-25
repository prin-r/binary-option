import React from 'react'
import PageContainer from 'components/PageContainer'
import { Text, Box, Flex } from 'rebass'

export default () => (
  <PageContainer>
    <Text fontSize="14px" lineHeight={1.7} color="white" mt="10px" mb="50px">
      <Text fontSize="22px">Terms of Service</Text>
      <br />
      The terms of this agreement (“Terms of Service”) govern the relationship
      between you and BitSwing, and any of its subsidiaries and affiliates
      (hereinafter “BitSwing” or “we” or “us” or “our”) regarding your use of
      BitSwing’ games, websites and related services (collectively “Service”).
      <br />
      <br />
      You must agree to this Terms of Service before accessing or using the
      Service.
      <br />
      <br />
      By playing, using or otherwise accessing a BitSwing’ Service, you agree to
      be bound by all the terms, conditions and restrictions in this Terms of
      Service. If you do not agree to this Terms of Services, do not play, use
      or otherwise access the Service. Your further use of our service and/or
      our website will constitute your acceptance of this Terms of service.
      <br />
      <br />
      By accepting this Terms of service, you represent and warrant to BitSwing
      that;
      <br />
      <br />
      1. you represent that you are age 13 or older and you understand and agree
      to this Terms of Service. If you are between the ages of 13 and 17, you
      represent that your legal guardian has reviewed and agreed to this Terms
      of Service.
      <br />
      <br />
      2. you acknowledge and agree to the current terms and conditions. We
      reserve the right to modify the website, services and software and/or
      change the system specification requirements necessary to access and use
      the services at any time without any prior notice.
      <br />
      <br />
      3. you acknowledge and agree that BitSwing allows you to play with token
      on testnet network. You acknowledge that such token is not a legal tender
      neither a legal money that is issued by monetary authority or government
      and is insufficient discharge of debt under constitutional of any laws in
      any jurisdictions.
      <br />
      <br />
      4. you acknowledge and agree that the purpose of this service is for
      enjoyment and for testing the limit of Band Protocol’s oracle only.
      <br />
      <br />
      5. you represent, warrant and agree to ensure that your use of our
      services will comply with all applicable laws, statutes and regulations.
      We shall not be responsible for any illegal or unauthorized use of our
      services by you. You fully understand the methods, rules and procedures of
      the services in general.
      <br />
      <br />
      6. you acknowledge and agree that this service may not be legal in some
      jurisdictions and we are not responsible to provide you with any legal
      advice or assurances in respect of your use of services and its website.
      We also make no representations whatsoever as to the legality of services
      in your jurisdiction. You are also solely responsible for ascertaining
      whether it is legal in your jurisdiction and you are responsible for
      abiding by any law in your jurisdiction.
      <br />
      <br />
      7. you acknowledge and agree that in case this service is illegal in your
      jurisdictions you will not play, use or otherwise access the Service.
      <br />
      <br />
      8. you acknowledge and agree that as a result of cheating and/or abusing
      the rule, your IP address will be banned from BitSwing.
      <br />
      <br />
      9. you acknowledge and agree that the telecommunications networks and
      Internet access services required for you to access and use the service
      are entirely beyond the control of us, and thus we are in no way liable
      for any outages, slowness, capacity constraints, or other deficiencies
      effecting the same.
      <br />
      <br />
      10. you acknowledge and agree that if a game, network, blockchain or
      hardware malfunctions, all gameplay during the malfunction period will be
      void and original bets may be lost in a worst-case scenario.
      <br />
      <br />
      11. you acknowledge and agree that we have the right to modify these terms
      at any time and without any prior notice. Changes to the system can also
      be made without any notice by the administrator.
      <br />
      <br />
      12. you will not institute, assist, or become involved in any type of
      attack, including without limitation distribution of a virus, denial of
      service attacks upon the Service, or other attempts to disrupt the Service
      or any other person’s use or enjoyment of the Service.
      <br />
      <br />
      13. you will not override or modify any security features or restrictions
      that BitSwing implemented or may implement in any Service.
      <br />
      <br />
      14. you will not copy, modify or distribute content from any BitSwing’s
      Services except as specifically authorized by us.
      <br />
      <br />
      The service is provided on an “AS IS” and “AS AVAILABLE” basis for your
      use, without warranties of any kind, express or implied, including without
      limitation the warranties of merchantability, fitness for a particular
      purpose, title, non-infringement, and those arising from course of dealing
      or usage of trade. BitSwing does not warrant that you will be able to
      access or use the Service at the times or locations of your choosing; that
      the Service will be uninterrupted or error-free; that defects will be
      corrected; or that the game or the Service are free of viruses or other
      harmful components.
      <br />
      <br />
      If any portion of these Terms of Service is found illegal or
      unenforceable, in whole or in part by any court of competent jurisdiction,
      such provision shall, as to such jurisdiction, be ineffective solely to
      the extent of such determination of invalidity or unenforceability without
      affecting the validity or enforceability thereof in any other manner or
      jurisdiction and without affecting the remaining provisions of the terms,
      which shall continue to be in full force and effect.
      <br />
      <br />
      This Terms of Service, any Supplemental Policies and any documents
      expressly incorporated by reference herein contain the entire
      understanding of you and BitSwing, and supersede all prior understandings
      of the parties hereto relating to the subject matter hereof, whether
      electronic, oral or written, or whether established by custom, practice,
      policy or precedent, between you and us with respect to the Service.
      <br />
      <br />
      All rights, title and interest in and to the Service (including without
      limitation any games, computer code, themes, objects, concepts, artwork,
      sounds, musical compositions, audio-visual effects, methods of operation,
      moral rights, documentation) are owned by BitSwing. We reserve all rights,
      including without limitation, all intellectual property rights or other
      proprietary rights, in connection with its games and the Service.
    </Text>
    <Flex
      mt="20px"
      justifyContent="center"
      alignItems="center"
      style={{ height: '30px', zIndex: 20000, position: 'relative' }}
    >
      <Box bg="#2d3033" p="10px 20px" mb="40px">
        <a
          href="/"
          style={{
            cursor: 'pointer',
            color: '#ffffff',
            textDecoration: 'none',
            fontSize: '14px',
          }}
        >
          Back
        </a>
      </Box>
    </Flex>
  </PageContainer>
)
