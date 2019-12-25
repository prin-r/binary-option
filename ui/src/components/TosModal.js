import React from 'react'
import styled from 'styled-components'
import { Flex, Text, Box } from 'rebass'
import { isMobile } from 'ui/media'

const _isMobile = isMobile()

const Container = styled(Flex).attrs({
  flexDirection: 'column',
  justifyContent: 'flex-start',
  px: _isMobile ? '25px' : '40px',
})`
  max-width: 1000px;
  border-radius: 8px;
  box-shadow: 3px 3px 4px 0 rgba(0, 0, 0, 0.5);
  border: solid 0 #979797;
  background-color: rgba(41, 40, 42, 0.83);
  font-size: 21px;
  color: #dad8d8;
`

const Header = styled(Text).attrs({
  fontSize: '16px',
  fontWeight: 'bold',
})``

const IndentText = ({ no = 'a.', children, pl }) => (
  <Flex alignSelf="flex-start" pl={pl}>
    <Text>{no}</Text>
    <Text ml={['7px', '15px']}>{children}</Text>
  </Flex>
)

export default ({ hideModal }) => (
  <Container>
    <Text
      fontSize="14px"
      lineHeight={1.7}
      color="white"
      mt={['10px', '20px']}
      mb={['10px', '30px']}
    >
      <Text fontSize="22px">Terms & Conditions</Text>
      <br />
      This Agreement is entered into by and these Terms & Conditions
      (hereinafter referred to as the “Agreement”) shall regulate the
      relationship between World Data Corporation, with company No. 1991143, and
      registered at Portcullis Chambers, 4th Floor Ellen Skelton Building, 3076
      Sir Francis Drake Highway, Road Town, Tortola, British Virgin Islands
      VG1110 and any of its subsidiaries and affiliates (hereinafter referred to
      as the “Company”), and the user (a natural or legal entity) (hereinafter
      referred to as the “User”) of www.bitswing.io (hereinafter referred as the
      “Website”).
      <br />
      <br />
      The User confirms that he/she has read, understood and accepted all
      information, conditions and terms set out on Website which are open to be
      reviewed and can be examined by the public and which include important
      legal Information.
      <br />
      <br />
      By accepting this Agreement, the User agrees and irrevocably accepts the
      terms and conditions contained in this Agreement, its annexes and/or
      appendices as well as other documentation/ information published on the
      Website. The User accepts this Agreement by playing, using or otherwise
      accessing the Website. By accepting the Agreement, the User enters into a
      legal and binding agreement with the Company. If you do not agree to this
      Terms of Services, do not play, use or otherwise access the Website. Your
      further use of our service and/or our website will constitute your
      acceptance of this Terms of service.
      <br />
      <br />
      The User hereby acknowledges that each and any, activity, transaction,
      order and/or communication performed by him/her on the Website, shall be
      governed by and/or must be executed in accordance with the terms and
      conditions of this Agreement and other documentation/information on the
      Website.
      <br />
      <br />
      All terms and conditions contained herein, shall at all times be
      applicable to the Legal Entity and the latter shall conform with such
      terms and conditions, obligations and rights at all times.
      <br />
      <br />
      <Header>1. Subject of the Agreement</Header>
      <br />
      The subject of the Agreement shall be the provision of Services to the
      User by the Company under the Agreement and through the Website.
      <br />
      <br />
      The Company shall carry out all transactions as provided in this Agreement
      on an execution-only basis. The Company is entitled to execute
      transactions requested by the User as provided in this Agreement even if
      the transaction is not beneficial for the User. Our services include
      ‘execution only’ meaning that the Company will act on your instructions
      and will not advice you on any transaction, nor will we monitor your
      decisions to determine if they are appropriate for you or to help you
      avoid losses. You should obtain your own financial, legal, taxation and
      other professional advice.
      <br />
      <br />
      Subject to the provisions of this Agreement, the Company agrees to provide
      the User with services of the Website subject to the User:
      <br />
      <br />
      <IndentText no="a." pl={['5px', '10px']}>
        Being of age of maturity in accordance with the jurisdiction he/she
        resides in or is a resident of, is of legal competence and of sound
        mind.
      </IndentText>
      <br />
      <IndentText no="b." pl={['5px', '10px']}>
        Not residing in any country where distribution or provision of the
        financial products or services offered by the Company would be contrary
        to local laws or regulations. It is the User’s responsibility to
        ascertain the terms of and comply with any local laws or regulations to
        which they are subject.
      </IndentText>
      <br />
      <IndentText no="c." pl={['5px', '10px']}>
        Not being a USA/territories of the US national and not being a resident
        of the following restricted jurisdictions: USA/territories of the US,
        Australia, Belgium, Canada, Cyprus, France, Israel, Malta, Malaysia,
        Palestine, Japan, Singapore, South Africa, Sudan, Syria, Iran, North
        Korea, the Netherlands, the United Kingdom, the Russian Federation
        and/or any country of the European Economic Area.
      </IndentText>
      <br />
      The Company will offer Services to the User at the absolute discretion of
      the Company subject to the provisions of this Agreement.
      <br />
      <br />
      <Header>2. Services of the Company</Header>
      <br />
      Services – services provided by the Company to the User through the
      Website of the Company, including without limitation to customer,
      analytics, news and marketing information services.
      <br />
      <br />
      The User hereby acknowledges and accepts that the Company shall not at any
      time provide any trust services and/or consultation or advisory services
      to the User.
      <br />
      <br />
      The Company shall process all transactions/Operations of the User in
      accordance with the terms and conditions of this Agreement and on an
      execution-only basis.
      <br />
      <br />
      The Company shall not be financially liable for any operations conducted
      by the User through the Website.
      <br />
      <br />
      Each User shall be the only authorized user of the Company’s services. The
      User is granted an exclusive and non-assignable right to the use of the
      Website.
      <br />
      <br />
      The User shall be liable for all orders given through his/her and any
      orders received in this manner by the Company shall be considered to have
      been given by the User. So long as any order are submitted through the
      Account of a User, the Company shall reasonably assume that such orders
      are submitted by User and the Company shall not be under any obligation to
      investigate further into the matter. The Company shall not be liable to
      and/or does not maintain any legal relations with, any third party other
      than the User.
      <br />
      <br />
      If the User acts on behalf of any third party and/or on behalf of any
      third party’s name, the Company shall not accept this person as a User and
      shall not be liable before this person regardless if such person was
      identified or not.
      <br />
      <br />
      The User acknowledges and accepts a) the risk of mistakes or
      misinterpretations in the orders sent through the Website due to technical
      or mechanical failures of such electronic means, b) the risk of any delays
      or other problems as well as c) the risk that the orders may be placed by
      persons unauthorized to use and/or access the Website, and the User agrees
      to indemnify the Company in full for any loss incurred as a result of
      acting in accordance with such orders.
      <br />
      <br />
      The User accepts that during the reception and transmission of his/her
      order, the Company shall have no responsibility as to its content and/or
      to the identity of the person placing the order.
      <br />
      <br />
      The User acknowledges that the Company will not take action based on the
      orders transmitted to the Company for execution by electronic means other
      than those orders transmitted using the predetermined electronic means
      such as the Trading Platform, and the Company shall have no liability
      towards the User for failing to take action based on such orders.
      <br />
      <br />
      The User acknowledges and agrees that any products or services that may be
      offered by the Company may not always be available for use, and it is in
      the Company's absolute discretion whether it will make these products
      available or not to the User at any time. The Company shall bear no
      liability, monetary or otherwise, in relation to this section, including
      without limitation to not making available any product at any given time.
      <br />
      <br />
      <Header>3. Limitation of Liability</Header>
      <br />
      The Website is provided on an “AS IS” and “AS AVAILABLE” basis for usage,
      without warranties of any kind, express or implied, including without
      limitation the warranties of merchantability, fitness for a particular
      purpose, title, non-infringement, and those arising from course of dealing
      or usage of trade. The Website does not warrant that the User will be able
      to access or use the Service at the times or locations of his/her
      choosing; that the Service will be uninterrupted or error-free; that
      defects will be corrected; or that the game or the Service are free of
      viruses or other harmful components.
      <br />
      <br />
      The Company does not guarantee uninterrupted service, safe and
      errors-free, and immunity from unauthorized access to the trading sites'
      servers nor disruptions caused from damages, malfunctions or failures in
      hardware, software, communications and systems in the User's computers and
      in the Company's suppliers.
      <br />
      <br />
      Supplying services by the Company depends, inter alia, on third parties
      and the Company bears no responsibility for any actions or omissions of
      third parties and bears no responsibility for any damage and/or loss
      and/or expense caused to the User and/or third party as a result of and/or
      in relation to any aforesaid action or omission.
      <br />
      <br />
      The Company will bear no responsibility for any damage of any kind
      allegedly caused to the User, which involves force majeure or any such
      event that the Company has no control of, and which has influenced the
      accessibility of its Website.
      <br />
      <br />
      Under no circumstances will the Company or its Agent(s) hold
      responsibility for direct or indirect damage of any kind, even if the
      Company or its Agent(s) had been notified of the possibility of aforesaid
      damages.
      <br />
      <br />
      <Header>
        The User hereby warrants and represents to the Company and agree that;
      </Header>
      <br />
      <IndentText no="a." pl={['5px', '10px']}>
        The User shall at all times be compliant with and honor all terms and
        conditions of this Agreement.
      </IndentText>
      <br />
      <IndentText no="b." pl={['5px', '10px']}>
        The User is not under any legal disability with respect to and is not
        subject to any laws or regulations which prevents his/her performance of
        this Agreement or any contract or transaction contemplated by this
        Agreement.
      </IndentText>
      <br />
      <IndentText no="c." pl={['5px', '10px']}>
        This service may not be legal in some jurisdictions and the Company is
        not responsible to provide the User with any legal advice or assurances
        in respect of the use of services and its website. The Company also make
        no representations whatsoever as to the legality of services in his/her
        jurisdiction. The User is also solely responsible for ascertaining
        whether it is legal in his/her jurisdiction and the User is responsible
        for abiding by any law in his/her jurisdiction.
      </IndentText>
      <br />
      <IndentText no="d." pl={['5px', '10px']}>
        In case this service is illegal in the User’s jurisdictions, the User
        will not play, use or otherwise access the Service.
      </IndentText>
      <br />
      <IndentText no="e." pl={['5px', '10px']}>
        The User shall be liable for all orders submitted and any orders
        received in this manner by the Company shall be considered to have been
        given by the User
      </IndentText>
      <br />
      <IndentText no="f." pl={['5px', '10px']}>
        Any trading strategies and/or investment decisions and/or any activities
        performed by the User through the Website are made having in
        mind/considered/being aware of all risks involved and solely on the
        basis of his/her knowledge and upon his/her sole discretion.
      </IndentText>
      <br />
      <IndentText no="g." pl={['5px', '10px']}>
        The User shall indemnify and hold harmless the Company of any claims
        and/or legal actions instigated against the Company.
      </IndentText>
      <br />
      <IndentText no="h." pl={['5px', '10px']}>
        The User irrevocably accept full responsibility for his/her actions
        according to current tax legislation valid at the place of
        residence/living of the User regarding any performed
        transactions/Operations, including but not limited to revenue/income
        tax.
      </IndentText>
      <br />
      <IndentText no="i." pl={['5px', '10px']}>
        The User irrevocably accepts that he/she is solely responsible for any
        technical deficiencies that may occur in User’s connection to the
        Website, in User's equipment used for receiving the services (including,
        but not limited to, personal computer, laptop, mobile phone and etc.),
        and confirms that he/she shall have no claims whatsoever against the
        Company for any direct and/or indirect damages the User may suffer due
        to such deficiencies.
      </IndentText>
      <br />
      <IndentText no="j." pl={['5px', '10px']}>
        This Agreement and/or to any materials made available on the Website may
        be amended unilaterally, from time to time, by the Company, and that
        he/she shall be responsible to check on the Website frequently in order
        to ensure that he/she has made himself/herself aware of any changes
        effected in such manner. Upon the continue of playing, using or
        otherwise accessing the Website, any changes effected to this Agreement
        and/or to any materials made available on the Website shall be deemed as
        acknowledged and accepted by the User.
      </IndentText>
      <br />
      <IndentText no="k." pl={['5px', '10px']}>
        The User understands and agrees that her/his consent is not necessary
        for any change to be effective. Whether the User does not respond and/or
        disagrees with the content of the amendments implemented in the
        Company’s Terms and Conditions, this will be considered as an acceptance
        by the User of the contents of the amendment and of the amended Terms
        and Conditions.
      </IndentText>
      <br />
      <IndentText no="l." pl={['5px', '10px']}>
        The User understands that it is his/her sole responsibility to remain
        up-to-date with all changes. The applicable version shall be the latest
        version uploaded on the Company’s website and in the event of a dispute
        the latest version shall prevail.
      </IndentText>
      <br />
      <IndentText no="m." pl={['5px', '10px']}>
        In case the User does not agree with the amendments, the User shall be
        entitled to terminate this Agreement in accordance with the Duration and
        Termination of the Agreement section herein included.
      </IndentText>
      <br />
      <IndentText no="n." pl={['5px', '10px']}>
        The User acts as principal and not as an authorized representative /
        attorney or trustee of any third party.
      </IndentText>
      <br />
      <IndentText no="o." pl={['5px', '10px']}>
        If a game, network, blockchain or hardware malfunctions, all gameplay
        during the malfunction period will be void and original bets may be lost
        in a worst-case scenario.
      </IndentText>
      <br />
      <IndentText no="p." pl={['5px', '10px']}>
        The User will not institute, assist, or become involved in any type of
        attack, including without limitation distribution of a virus, denial of
        service attacks upon the Service, or other attempts to disrupt the
        Service or any other person’s use or enjoyment of the Website.
      </IndentText>
      <br />
      <IndentText no="q." pl={['5px', '10px']}>
        The User will not override or modify any security features or
        restrictions that the Company implemented or may implement in the
        Website.
      </IndentText>
      <br />
      <IndentText no="r." pl={['5px', '10px']}>
        The User will not copy, modify or distribute content from any BitSwing’
        Services except as specifically authorized by us.
      </IndentText>
      <br />
      The Company shall be entitled to unilaterally modify and/or amend and/or
      restate the terms and conditions of this Agreement and/or the material
      made available on the Website without prior notice to the User. The
      Company shall notify the User of any such changes through the Website
      and/or by the delivery of an email to the User.
      <br />
      <br />
      <Header>4. Indemnity and Liability</Header>
      <br />
      The User shall indemnify and keep indemnified the Company and its
      directors, officers, employees or representatives against all direct or
      indirect liabilities (including without limitation all losses, damages,
      claims, costs or expenses), incurred by the Company or any other third
      party in respect to any act or omission by the User in the performance of
      his/her obligations under this Agreement and/or the liquidation of any
      financial instruments of the User in settlement of any claims with the
      Company, unless such liabilities result from gross negligence, willful
      default or fraud by the Company. This indemnity shall survive termination
      of this Agreement.
      <br />
      <br />
      The Company shall not be liable for any direct and/or indirect loss,
      expense, cost or liability incurred by the User in relation to this
      Agreement.
      <br />
      <br />
      The Company shall not be liable for any loss which is the result of
      misrepresentation of facts, error in judgment or any act done or which the
      Company has omitted to do, whenever caused, unless such act or omission
      resulted from gross negligence, willful default or fraud by the Company.
      <br />
      <br />
      The Company shall not be liable for any act or omission or for the
      insolvency of any counterparty, bank, custodian or other third party which
      acts on behalf of the User or with or through whom transactions on behalf
      of the User are carried out.
      <br />
      <br />
      <Header>5. Assignment</Header>
      <br />
      The Agreement shall be personal to the User and the User shall not be
      entitled to assign or transfer any of his/her rights or obligations under
      this Agreement.
      <br />
      <br />
      The Company may at any time assign or transfer any of its rights or
      obligations under this Agreement to a third party. The Company shall
      notify the User of any such assignment.
      <br />
      <br />
      <Header>6. Charges and Fees</Header>
      <br />
      The Company shall be entitled to receive a fee from the User regarding the
      Service(s), provided by the Company.
      <br />
      <br />
      The Company has the right to amend its fees and charges from time to time.
      <br />
      <br />
      <Header>7. Governing Law</Header>
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
      The terms and conditions of this Agreement as well as any matters
      pertaining to this agreement, including without limitation to matters of
      interpretation and/or disputes, shall be governed by the laws of
      Singapore. The Company and the Users irrevocably submit to the
      jurisdiction of the courts of Singapore.
      <br />
      <br />
      The Company shall be entitled to use the interpreter's’ services during
      the court trial in case of dealing with disputable situation according to
      the legislation of the Singapore.
      <br />
      <br />
      <Header>8. Duration and Termination of the Agreement</Header>
      <br />
      The Agreement herein shall be concluded for an indefinite term.
      <br />
      <br />
      The Agreement herein shall come into force when the User accepts the
      Agreement.
      <br />
      <br />
      In case of any discrepancies between the text of the Agreement in English
      and its translation in any other language, the text of the Agreement in
      English as a whole shall prevail, as well as the English version/text of
      any other documentation/information published on the Website.
      <br />
      <br />
      the Company shall be entitled to block the User's account without prior
      notice and/or entitled to unilaterally terminate the Agreement in the
      extrajudicial procedure under the following circumstances:
      <br />
      <br />
      <IndentText no="a)." pl={['5px', '10px']}>
        The User violates or the Company has reasonable grounds to believe that
        the User violated, any of the User’s obligations under and/or terms of,
        this Agreement and/or is in breach of any of the warranties and
        representations made by her/him in this Agreement.
      </IndentText>
      <br />
      <IndentText no="b)." pl={['5px', '10px']}>
        If it comes to the Company’s attention and/or the Company has reasonable
        grounds to believe that the User has not reached the age of maturity in
        the country which he is resident or citizen, as applicable.
      </IndentText>
      <br />
      <IndentText no="c)." pl={['5px', '10px']}>
        If it comes to the Company’s attention and/or the Company has reasonable
        grounds to believe that the User became a citizen of the restricted
        jurisdictions.
      </IndentText>
      <br />
      <IndentText no="d)." pl={['5px', '10px']}>
        The Company has suspicion based on available information that the User:
      </IndentText>
      <br />
      {/* SubList */}
      <IndentText no="a." pl={['35px', '48px']}>
        Is and/or has been using fraudulent means or was involved in a
        fraudulent scheme in relation to the performance of this Agreement;
      </IndentText>
      <br />
      <IndentText no="b." pl={['35px', '48px']}>
        Has illegally and/or improperly and/or unfairly and/or otherwise gained
        an unfair advantage, over and/or to the detriment of (i) other Users of
        the Company and/or (ii) the Company;
      </IndentText>
      <br />
      <IndentText no="c." pl={['35px', '48px']}>
        Has unjustly enriched by using information which was intentionally
        and/or negligently and/or otherwise concealed and/or not disclosed in
        advance by the User to the Company and/or for which if the Company had
        known in advance, it would have not consented and/or it would not have
        authorised the use of such information by the User for the purposes of
        this Agreement; and/or
      </IndentText>
      <br />
      <IndentText no="d." pl={['35px', '48px']}>
        Has performed acts with the intention and/or effect of manipulating
        and/or abusing the market and/or the Company’s trading systems and/or
        deceiving the Company and/or defrauding the Company; and/or
      </IndentText>
      <br />
      <IndentText no="e." pl={['35px', '48px']}>
        Has acted in bad faith during the performance of his obligations under
        the Agreement.
      </IndentText>
      <br />
      <IndentText no="e)." pl={['5px', '10px']}>
        The User being guilty, or the Company has suspicions that the User is
        guilty, of malicious conduct or gross negligence or fraud or of using
        fraudulent means or was involved in fraud scheme in relation to the
        performance of this Agreement.
      </IndentText>
      <br />
      <IndentText no="f)." pl={['5px', '10px']}>
        Where the Company identifies that the User is involved and/or is using a
        high frequency trading software with the purpose of manipulating the
        Company’s systems and/or the Website and/or has illegally and/or
        improperly and/or maliciously and/or knowingly gained an unfair
        advantage over and/or to the detriment of other Users of the Company
        and/or the Company and/or this high frequency trading software is
        designed to abuse the Company’s systems and/or the Website.
      </IndentText>
      <br />
      <br />
      <Header>9. Copyrights and Intellectual Property (IP)</Header>
      <br />
      All rights, title and interest in and to the Service (including without
      limitation any games, computer code, themes, objects, concepts, artwork,
      sounds, musical compositions, audio-visual effects, methods of operation,
      moral rights, documentation) are owned by the Company. The company reserve
      all rights, including without limitation, all intellectual property rights
      or other proprietary rights, in connection with its games and the Service.
      <br />
      <br />
      Copyrights and Intellectual Property (IP) on the Website are the Company's
      property or of third parties which have authorized the Company to use such
      IP on the Website and Service(s). It is forbidden to copy, distribute,
      duplicate, present in public, or deliver the copyrighted material, in
      whole or in part, to third parties. It is forbidden to alter, advertise,
      broadcast, transfer, sell, distribute or make any commercial use of the
      copyrighted material, in whole or in part, except with duly signed prior
      permission from the Company.
      <br />
      <br />
      Unless explicitly stated otherwise, any material and/or message, including
      without limitation, idea, knowledge, technique, marketing plan,
      information, questions, answers, suggestions, emails and comments
      (hereinafter – “Information”) delivered to the Company shall not be
      considered the User's confidential or proprietary right of.
      <br />
      <br />
      User undertakes that any notice, message or any other material supplied by
      the User shall be appropriate and shall not harm other persons including
      their proprietary rights. User shall refrain from uploading or sending any
      illegal and/or harmful and/or disturbing to other Users material, and is
      strictly forbidden from taking any action, which might damage the Company.
      <br />
      <br />
      <Header>10. Content and Third Parties’ Websites</Header>
      <br />
      The Website might include general information, news, comments, quotes and
      other information related to financial markets and/or advertising. Some
      information is supplied to the Website by unaffiliated companies.
      <br />
      <br />
      The Company does not provide investment research. All news, comments,
      quotes and other information related to financial markets published by the
      Company are of promotional/marketing nature only.
      <br />
      <br />
      The Company does not prepare, edit or promote the information/links and/or
      other information provided by unaffiliated companies.
      <br />
      <br />
      The Company will not be liable for the content of any third-party websites
      or the actions or omissions of their proprietors nor for the contents of
      third-party advertisements and sponsorship on those websites. The
      hyperlinks to other websites are provided for information purposes only.
      Any User and/or potential User use any such links at his/her own risk.
    </Text>
    <Flex
      mt="20px"
      justifyContent="center"
      alignItems="center"
      style={{ height: '30px' }}
    >
      <Box
        bg="#2d3033"
        p="10px 20px"
        fontSize={['12px', '16px']}
        mb="40px"
        onClick={() => hideModal()}
        style={{ cursor: 'pointer' }}
      >
        Back
      </Box>
    </Flex>
  </Container>
)
